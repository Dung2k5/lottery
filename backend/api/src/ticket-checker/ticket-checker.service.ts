import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckTicketDto } from './dto/check-ticket.dto';
import { checkBatchTraditionalTickets } from './engine/traditional-rule';
import { DrawStatus } from '@prisma/client';
import { DrawSessionData } from './engine/types';

@Injectable()
export class TicketCheckerService {
  constructor(private prisma: PrismaService) {}

  async checkTickets(dto: CheckTicketDto) {
    if (!dto.lotteryTypeCode && !dto.stationCode) {
      throw new BadRequestException('Phải cung cấp lotteryTypeCode hoặc stationCode');
    }

    const d = new Date(dto.drawDate);
    const startOfDay = new Date(d.setHours(0, 0, 0, 0));
    const endOfDay = new Date(d.setHours(23, 59, 59, 999));

    const where: any = {
      drawDate: {
        gte: startOfDay,
        lt: endOfDay,
      }
    };

    if (dto.lotteryTypeCode) where.lotteryType = { code: dto.lotteryTypeCode };
    if (dto.stationCode) where.station = { code: dto.stationCode };

    const drawSession = await this.prisma.drawSession.findFirst({
      where,
      include: {
        lotteryType: true,
        station: true,
        results: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!drawSession) {
      return { status: 'UNAVAILABLE', message: 'Không tìm thấy kỳ quay cho đài/loại hình và ngày này.' };
    }

    if (drawSession.status !== DrawStatus.PUBLISHED && drawSession.status !== DrawStatus.REVISED) {
      return { status: 'PENDING', message: 'Kỳ quay chưa được công bố chính thức.' };
    }

    const sessionData: DrawSessionData = {
      drawDate: drawSession.drawDate.toISOString(),
      lotteryTypeCode: drawSession.lotteryType.code,
      stationCode: drawSession.station?.code,
      results: drawSession.results.map(r => ({
        prizeCode: r.prizeCode,
        prizeName: r.prizeName,
        winningNumbers: r.winningNumbers,
      })),
    };

    const results = checkBatchTraditionalTickets(dto.ticketNumbers, sessionData);

    return {
      status: 'SUCCESS',
      drawInfo: {
        lotteryName: drawSession.lotteryType.name,
        stationName: drawSession.station?.name,
        drawDate: dto.drawDate,
        status: drawSession.status,
      },
      results,
    };
  }
}
