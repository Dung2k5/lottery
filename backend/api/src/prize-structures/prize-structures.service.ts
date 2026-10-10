import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrizeStructureDto } from './dto/create-prize-structure.dto';
import { UpdatePrizeStructureDto } from './dto/update-prize-structure.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrizeStructuresService {
  constructor(private prisma: PrismaService) {}

  async create(createPrizeStructureDto: CreatePrizeStructureDto) {
    const struct = await this.prisma.prizeStructure.create({
      data: createPrizeStructureDto,
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'PrizeStructure',
        entityId: struct.id,
        action: 'CREATE',
        afterState: JSON.parse(JSON.stringify(struct)),
      },
    });

    return struct;
  }

  findAll() {
    return this.prisma.prizeStructure.findMany();
  }

  async findOne(id: string) {
    const struct = await this.prisma.prizeStructure.findUnique({
      where: { id },
    });
    if (!struct) throw new NotFoundException('Prize structure not found');
    return struct;
  }

  async update(id: string, updatePrizeStructureDto: UpdatePrizeStructureDto) {
    const beforeState = await this.findOne(id);

    const afterState = await this.prisma.prizeStructure.update({
      where: { id },
      data: updatePrizeStructureDto,
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'PrizeStructure',
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
    
    const afterState = await this.prisma.prizeStructure.update({
      where: { id },
      data: { isActive: false },
    });

    await this.prisma.auditLog.create({
      data: {
        entityType: 'PrizeStructure',
        entityId: id,
        action: 'DELETE',
        beforeState: JSON.parse(JSON.stringify(beforeState)),
        afterState: JSON.parse(JSON.stringify(afterState)),
      },
    });

    return afterState;
  }
}
