import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const existing = await this.prisma.drawSchedule.findFirst({
      where: {
        stationId: createScheduleDto.stationId || null,
        lotteryTypeId: createScheduleDto.lotteryTypeId,
        dayOfWeek: createScheduleDto.dayOfWeek,
      },
    });

    if (existing) {
      throw new ConflictException('Schedule already exists for this station, lottery type, and day');
    }

    return this.prisma.drawSchedule.create({ data: createScheduleDto });
  }

  findAll() {
    return this.prisma.drawSchedule.findMany({
      include: {
        station: {
          include: {
            region: true,
            province: true,
          },
        },
        lotteryType: true,
      },
      orderBy: [
        { dayOfWeek: 'asc' },
        { drawTime: 'asc' },
      ]
    });
  }

  async findOne(id: string) {
    const schedule = await this.prisma.drawSchedule.findUnique({
      where: { id },
      include: {
        station: {
          include: {
            region: true,
            province: true,
          },
        },
        lotteryType: true,
      },
    });
    if (!schedule) throw new NotFoundException('Schedule not found');
    return schedule;
  }

  async findByDay(dayOfWeek: number) {
    return this.prisma.drawSchedule.findMany({
      where: { dayOfWeek, isActive: true },
      include: {
        station: {
          include: {
            region: true,
            province: true,
          },
        },
        lotteryType: true,
      },
      orderBy: { drawTime: 'asc' },
    });
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const existing = await this.findOne(id); // Ensure exists

    if (updateScheduleDto.dayOfWeek !== undefined || updateScheduleDto.stationId || updateScheduleDto.lotteryTypeId) {
      const duplicate = await this.prisma.drawSchedule.findFirst({
        where: {
          stationId: updateScheduleDto.stationId !== undefined ? (updateScheduleDto.stationId || null) : existing.stationId,
          lotteryTypeId: updateScheduleDto.lotteryTypeId || existing.lotteryTypeId,
          dayOfWeek: updateScheduleDto.dayOfWeek !== undefined ? updateScheduleDto.dayOfWeek : existing.dayOfWeek,
          NOT: { id },
        },
      });

      if (duplicate) {
        throw new ConflictException('Schedule already exists for this station, lottery type, and day');
      }
    }

    return this.prisma.drawSchedule.update({
      where: { id },
      data: updateScheduleDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.drawSchedule.delete({ where: { id } });
  }
}
