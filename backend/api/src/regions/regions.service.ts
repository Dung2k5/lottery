import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    const existing = await this.prisma.region.findFirst({
      where: {
        OR: [
          { code: createRegionDto.code },
          { slug: createRegionDto.slug },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Region code or slug already exists');
    }

    return this.prisma.region.create({ data: createRegionDto });
  }

  findAll() {
    return this.prisma.region.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) throw new NotFoundException('Region not found');
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    await this.findOne(id); // check if exists

    if (updateRegionDto.code || updateRegionDto.slug) {
      const existing = await this.prisma.region.findFirst({
        where: {
          OR: [
            { code: updateRegionDto.code },
            { slug: updateRegionDto.slug },
          ],
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException('Region code or slug already exists');
      }
    }

    return this.prisma.region.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.region.delete({ where: { id } });
  }
}
