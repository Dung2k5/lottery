import { CreateDrawSessionDto } from './dto/create-result.dto';
import { UpdateDrawResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ResultsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateDrawSessionDto): Promise<{
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(date?: string, lotteryTypeId?: string): Promise<({
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        revisions: {
            id: string;
            drawSessionId: string;
            previousData: import("@prisma/client").Prisma.JsonValue;
            reason: string;
            createdAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateDto: UpdateDrawResultDto): Promise<{
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    publish(id: string): Promise<{
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getPublicDrawsByDate(dateString: string, regionCode?: string): Promise<({
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
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getLatestPublicDraws(regionCode?: string): Promise<({
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
        results: {
            id: string;
            drawSessionId: string;
            prizeCode: string;
            prizeName: string;
            winningNumbers: string[];
            order: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        lotteryTypeId: string;
        stationId: string | null;
        drawDate: Date;
        drawCode: string | null;
        status: import("@prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
