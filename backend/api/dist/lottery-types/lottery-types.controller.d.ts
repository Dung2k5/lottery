import { LotteryTypesService } from './lottery-types.service';
import { CreateLotteryTypeDto } from './dto/create-lottery-type.dto';
import { UpdateLotteryTypeDto } from './dto/update-lottery-type.dto';
export declare class LotteryTypesController {
    private readonly lotteryTypesService;
    constructor(lotteryTypesService: LotteryTypesService);
    create(createLotteryTypeDto: CreateLotteryTypeDto): Promise<{
        id: string;
        code: string;
        name: string;
        category: string;
        description: string | null;
        isActive: boolean;
        regionId: string | null;
        provinceId: string | null;
        stationId: string | null;
        drawModeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        region: {
            id: string;
            code: string;
            slug: string;
            name: string;
            order: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        province: {
            id: string;
            code: string;
            slug: string;
            name: string;
            order: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        station: {
            id: string;
            code: string;
            slug: string;
            name: string;
            order: number;
            isActive: boolean;
            regionId: string | null;
            provinceId: string | null;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        drawMode: {
            id: string;
            code: string;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    } & {
        id: string;
        code: string;
        name: string;
        category: string;
        description: string | null;
        isActive: boolean;
        regionId: string | null;
        provinceId: string | null;
        stationId: string | null;
        drawModeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        prizeStructures: {
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
        }[];
    } & {
        id: string;
        code: string;
        name: string;
        category: string;
        description: string | null;
        isActive: boolean;
        regionId: string | null;
        provinceId: string | null;
        stationId: string | null;
        drawModeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateLotteryTypeDto: UpdateLotteryTypeDto): Promise<{
        id: string;
        code: string;
        name: string;
        category: string;
        description: string | null;
        isActive: boolean;
        regionId: string | null;
        provinceId: string | null;
        stationId: string | null;
        drawModeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        code: string;
        name: string;
        category: string;
        description: string | null;
        isActive: boolean;
        regionId: string | null;
        provinceId: string | null;
        stationId: string | null;
        drawModeId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
