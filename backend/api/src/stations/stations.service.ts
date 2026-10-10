import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StationsService {
  constructor(private prisma: PrismaService) {}

  async create(createStationDto: CreateStationDto) {
    const existing = await this.prisma.station.findFirst({
      where: {
        OR: [
          { code: createStationDto.code },
          { slug: createStationDto.slug },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Station code or slug already exists');
    }

    return this.prisma.station.create({ data: createStationDto });
  }

  findAll() {
    return this.prisma.station.findMany({
      orderBy: { order: 'asc' },
      include: {
        region: true,
        province: true,
      },
    });
  }

  async findOne(id: string) {
    const station = await this.prisma.station.findUnique({
      where: { id },
      include: {
        region: true,
        province: true,
      },
    });
    if (!station) throw new NotFoundException('Station not found');
    return station;
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    await this.findOne(id); // Ensure exists

    if (updateStationDto.code || updateStationDto.slug) {
      const existing = await this.prisma.station.findFirst({
        where: {
          OR: [
            { code: updateStationDto.code },
            { slug: updateStationDto.slug },
          ],
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException('Station code or slug already exists');
      }
    }

    return this.prisma.station.update({
      where: { id },
      data: updateStationDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.station.delete({ where: { id } });
  }
}
