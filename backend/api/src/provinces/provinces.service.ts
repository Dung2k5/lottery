import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProvincesService {
  constructor(private prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto) {
    const existing = await this.prisma.province.findFirst({
      where: {
        OR: [
          { code: createProvinceDto.code },
          { slug: createProvinceDto.slug },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Province code or slug already exists');
    }

    return this.prisma.province.create({ data: createProvinceDto });
  }

  findAll() {
    return this.prisma.province.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const province = await this.prisma.province.findUnique({ where: { id } });
    if (!province) throw new NotFoundException('Province not found');
    return province;
  }

  async update(id: string, updateProvinceDto: UpdateProvinceDto) {
    await this.findOne(id); // check if exists

    if (updateProvinceDto.code || updateProvinceDto.slug) {
      const existing = await this.prisma.province.findFirst({
        where: {
          OR: [
            { code: updateProvinceDto.code },
            { slug: updateProvinceDto.slug },
          ],
          NOT: { id },
        },
      });

      if (existing) {
        throw new ConflictException('Province code or slug already exists');
      }
    }

    return this.prisma.province.update({
      where: { id },
      data: updateProvinceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.province.delete({ where: { id } });
  }
}
