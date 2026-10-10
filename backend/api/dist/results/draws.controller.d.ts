import { ResultsService } from './results.service';
export declare class DrawsController {
    private readonly resultsService;
    constructor(resultsService: ResultsService);
    getDrawsByDate(dateString: string, regionCode?: string): Promise<({
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
        status: import(".prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getLatestDraws(regionCode?: string): Promise<({
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
        status: import(".prisma/client").$Enums.DrawStatus;
        dataSourceId: string | null;
        verifiedAt: Date | null;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
