"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RegionsService = class RegionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRegionDto) {
        const existing = await this.prisma.region.findFirst({
            where: {
                OR: [
                    { code: createRegionDto.code },
                    { slug: createRegionDto.slug },
                ],
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Region code or slug already exists');
        }
        return this.prisma.region.create({ data: createRegionDto });
    }
    findAll() {
        return this.prisma.region.findMany({
            orderBy: { order: 'asc' },
        });
    }
    async findOne(id) {
        const region = await this.prisma.region.findUnique({ where: { id } });
        if (!region)
            throw new common_1.NotFoundException('Region not found');
        return region;
    }
    async update(id, updateRegionDto) {
        await this.findOne(id);
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
                throw new common_1.ConflictException('Region code or slug already exists');
            }
        }
        return this.prisma.region.update({
            where: { id },
            data: updateRegionDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.region.delete({ where: { id } });
    }
};
exports.RegionsService = RegionsService;
exports.RegionsService = RegionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RegionsService);
//# sourceMappingURL=regions.service.js.map