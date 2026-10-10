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
exports.ProvincesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProvincesService = class ProvincesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProvinceDto) {
        const existing = await this.prisma.province.findFirst({
            where: {
                OR: [
                    { code: createProvinceDto.code },
                    { slug: createProvinceDto.slug },
                ],
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Province code or slug already exists');
        }
        return this.prisma.province.create({ data: createProvinceDto });
    }
    findAll() {
        return this.prisma.province.findMany({
            orderBy: { order: 'asc' },
        });
    }
    async findOne(id) {
        const province = await this.prisma.province.findUnique({ where: { id } });
        if (!province)
            throw new common_1.NotFoundException('Province not found');
        return province;
    }
    async update(id, updateProvinceDto) {
        await this.findOne(id);
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
                throw new common_1.ConflictException('Province code or slug already exists');
            }
        }
        return this.prisma.province.update({
            where: { id },
            data: updateProvinceDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.province.delete({ where: { id } });
    }
};
exports.ProvincesService = ProvincesService;
exports.ProvincesService = ProvincesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProvincesService);
//# sourceMappingURL=provinces.service.js.map