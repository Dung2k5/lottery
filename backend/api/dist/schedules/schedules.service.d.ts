import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class SchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createScheduleDto: CreateScheduleDto): Promise<{
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        station: ({
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
        } & {
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
        }) | null;
        lotteryType: {
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
        };
    } & {
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        station: ({
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
        } & {
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
        }) | null;
        lotteryType: {
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
        };
    } & {
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByDay(dayOfWeek: number): Promise<({
        station: ({
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
        } & {
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
        }) | null;
        lotteryType: {
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
        };
    } & {
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<{
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        stationId: string | null;
        lotteryTypeId: string;
        dayOfWeek: number;
        drawTime: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
