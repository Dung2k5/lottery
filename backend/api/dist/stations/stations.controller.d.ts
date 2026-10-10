import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    create(createStationDto: CreateStationDto): Promise<{
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, updateStationDto: UpdateStationDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
