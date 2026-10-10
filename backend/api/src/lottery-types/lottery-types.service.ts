import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateLotteryTypeDto } from './dto/create-lottery-type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LotteryTypesService {
  constructor(private prisma: PrismaService) {}

  async create(createLotteryTypeDto: CreateLotteryTypeDto) {
    const exists = await this.prisma.lotteryType.findUnique({
      where: { code: createLotteryTypeDto.code },
    });
    if (exists) {
      throw new ConflictException('Lottery type code already exists');
    }

    const type = await this.prisma.lotteryType.create({
      data: createLotteryTypeDto,
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'LotteryType',
        entityId: type.id,
        action: 'CREATE',
        afterState: JSON.parse(JSON.stringify(type)),
      },
    });

    return type;
  }

  findAll() {
    return this.prisma.lotteryType.findMany({
      include: {
        region: true,
        province: true,
        issuer: true,
        drawMode: true,
      },
    });
  }

  async findOne(id: string) {
    const type = await this.prisma.lotteryType.findUnique({
      where: { id },
      include: {
        prizeStructures: true,
      },
    });
    if (!type) {
      throw new NotFoundException('Lottery type not found');
    }
    return type;
  }

  async update(id: string, updateLotteryTypeDto: UpdateLotteryTypeDto) {
    const beforeState = await this.findOne(id);

    if (updateLotteryTypeDto.code && updateLotteryTypeDto.code !== beforeState.code) {
      const exists = await this.prisma.lotteryType.findUnique({
        where: { code: updateLotteryTypeDto.code },
      });
      if (exists) {
        throw new ConflictException('Lottery type code already exists');
      }
    }

    const afterState = await this.prisma.lotteryType.update({
      where: { id },
      data: updateLotteryTypeDto,
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'LotteryType',
        entityId: id,
        action: 'UPDATE',
        beforeState: JSON.parse(JSON.stringify(beforeState)),
        afterState: JSON.parse(JSON.stringify(afterState)),
      },
    });

    return afterState;
  }

  async remove(id: string) {
    const beforeState = await this.findOne(id);
    
    // Instead of hard delete, we set isActive to false
    const afterState = await this.prisma.lotteryType.update({
      where: { id },
      data: { isActive: false },
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'LotteryType',
        entityId: id,
        action: 'DELETE', // Logged as delete, but it's a soft delete
        beforeState: JSON.parse(JSON.stringify(beforeState)),
        afterState: JSON.parse(JSON.stringify(afterState)),
      },
    });

    return afterState;
  }
}
