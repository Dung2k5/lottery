import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateDrawSessionDto } from './dto/create-result.dto';
import { UpdateDrawResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DrawStatus } from '@prisma/client';

@Injectable()
export class ResultsService {
  constructor(private prisma: PrismaService) {}

  async create(createDto: CreateDrawSessionDto) {
    const existing = await this.prisma.drawSession.findFirst({
      where: {
        lotteryTypeId: createDto.lotteryTypeId,
        stationId: createDto.stationId || null,
        drawDate: new Date(createDto.drawDate),
      }
    });

    if (existing) {
      throw new ConflictException('Draw session already exists for this date');
    }

    return this.prisma.drawSession.create({
      data: {
        lotteryTypeId: createDto.lotteryTypeId,
        stationId: createDto.stationId,
        drawDate: new Date(createDto.drawDate),
        drawCode: createDto.drawCode,
        dataSourceId: createDto.dataSourceId,
        status: DrawStatus.DRAFT,
        results: {
          create: createDto.results.map((r, index) => ({
            prizeCode: r.prizeCode,
            prizeName: r.prizeName,
            winningNumbers: r.winningNumbers,
            order: r.order ?? index,
          }))
        }
      },
      include: { results: true }
    });
  }

  async findAll(date?: string, lotteryTypeId?: string) {
    const where: any = {};
    if (date) {
      const d = new Date(date);
      where.drawDate = {
        gte: new Date(d.setHours(0, 0, 0, 0)),
        lt: new Date(d.setHours(23, 59, 59, 999))
      };
    }
    if (lotteryTypeId) {
      where.lotteryTypeId = lotteryTypeId;
    }
    return this.prisma.drawSession.findMany({
      where,
      include: { results: true }
    });
  }

  async findOne(id: string) {
    const session = await this.prisma.drawSession.findUnique({
      where: { id },
      include: { results: true, revisions: true }
    });
    if (!session) throw new NotFoundException('Draw session not found');
    return session;
  }

  async update(id: string, updateDto: UpdateDrawResultDto) {
    const session = await this.findOne(id);

    if (session.status === DrawStatus.PUBLISHED) {
      if (!updateDto.reason) {
        throw new BadRequestException('Reason is required when updating a published draw session');
      }

      // Create snapshot
      await this.prisma.resultRevision.create({
        data: {
          drawSessionId: session.id,
          previousData: session.results,
          reason: updateDto.reason,
        }
      });
    }

    // Delete old results and insert new ones
    await this.prisma.prizeResult.deleteMany({ where: { drawSessionId: id } });

    return this.prisma.drawSession.update({
      where: { id },
      data: {
        status: session.status === DrawStatus.PUBLISHED ? DrawStatus.REVISED : session.status,
        results: {
          create: updateDto.results.map((r, index) => ({
            prizeCode: r.prizeCode,
            prizeName: r.prizeName,
            winningNumbers: r.winningNumbers,
            order: r.order ?? index,
          }))
        }
      },
      include: { results: true }
    });
  }

  async publish(id: string) {
    const session = await this.findOne(id);
    if (session.status === DrawStatus.PUBLISHED) {
      throw new BadRequestException('Already published');
    }
    return this.prisma.drawSession.update({
      where: { id },
      data: {
        status: DrawStatus.PUBLISHED,
        publishedAt: new Date(),
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.drawSession.delete({ where: { id } });
  }

  async getPublicDrawsByDate(dateString: string, regionCode?: string) {
    console.log("THIS IS:", this);
    console.log("PRISMA IS:", this?.prisma);
    const d = new Date(dateString);
    const startOfDay = new Date(d.setHours(0, 0, 0, 0));
    const endOfDay = new Date(d.setHours(23, 59, 59, 999));

    const where: any = {
      drawDate: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: {
        in: [DrawStatus.PUBLISHED, DrawStatus.REVISED],
      },
    };

    if (regionCode) {
      where.lotteryType = {
        region: {
          code: regionCode,
        },
      };
    }

    return this.prisma.drawSession.findMany({
      where,
      include: {
        station: {
          include: {
            region: true,
            province: true,
          }
        },
        lotteryType: true,
        results: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getLatestPublicDraws(regionCode?: string) {
    const where: any = {
      status: {
        in: [DrawStatus.PUBLISHED, DrawStatus.REVISED],
      },
    };

    if (regionCode) {
      where.lotteryType = {
        region: {
          code: regionCode,
        },
      };
    }

    // Get the latest draw date that has published results
    const latestDraw = await this.prisma.drawSession.findFirst({
      where,
      orderBy: { drawDate: 'desc' },
      select: { drawDate: true },
    });

    if (!latestDraw) {
      return [];
    }

    // Return all draws on that date
    return this.getPublicDrawsByDate(latestDraw.drawDate.toISOString().split('T')[0], regionCode);
  }
}
