import { CreatePrizeStructureDto } from './dto/create-prize-structure.dto';
import { UpdatePrizeStructureDto } from './dto/update-prize-structure.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PrizeStructuresService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPrizeStructureDto: CreatePrizeStructureDto): Promise<{
        id: string;
        lotteryTypeId: string;
        code: string;
        name: string;
        order: number;
        quantity: number;
        digitCount: number | null;
        prizeValue: string | null;
        matchingRule: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        lotteryTypeId: string;
        code: string;
        name: string;
        order: number;
        quantity: number;
        digitCount: number | null;
        prizeValue: string | null;
        matchingRule: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        lotteryTypeId: string;
        code: string;
        name: string;
        order: number;
        quantity: number;
        digitCount: number | null;
        prizeValue: string | null;
        matchingRule: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePrizeStructureDto: UpdatePrizeStructureDto): Promise<{
        id: string;
        lotteryTypeId: string;
        code: string;
        name: string;
        order: number;
        quantity: number;
        digitCount: number | null;
        prizeValue: string | null;
        matchingRule: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        lotteryTypeId: string;
        code: string;
        name: string;
        order: number;
        quantity: number;
        digitCount: number | null;
        prizeValue: string | null;
        matchingRule: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
