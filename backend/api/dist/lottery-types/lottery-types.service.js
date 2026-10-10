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
exports.LotteryTypesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LotteryTypesService = class LotteryTypesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLotteryTypeDto) {
        const exists = await this.prisma.lotteryType.findUnique({
            where: { code: createLotteryTypeDto.code },
        });
        if (exists) {
            throw new common_1.ConflictException('Lottery type code already exists');
        }
        const type = await this.prisma.lotteryType.create({
            data: createLotteryTypeDto,
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'LotteryType',
                entityId: type.id,
                action: 'CREATE',
                afterState: JSON.parse(JSON.stringify(type)),
            },
        });
        return type;
    }
    findAll() {
        return this.prisma.lotteryType.findMany({
            include: {
                region: true,
                province: true,
                issuer: true,
                drawMode: true,
            },
        });
    }
    async findOne(id) {
        const type = await this.prisma.lotteryType.findUnique({
            where: { id },
            include: {
                prizeStructures: true,
            },
        });
        if (!type) {
            throw new common_1.NotFoundException('Lottery type not found');
        }
        return type;
    }
    async update(id, updateLotteryTypeDto) {
        const beforeState = await this.findOne(id);
        if (updateLotteryTypeDto.code && updateLotteryTypeDto.code !== beforeState.code) {
            const exists = await this.prisma.lotteryType.findUnique({
                where: { code: updateLotteryTypeDto.code },
            });
            if (exists) {
                throw new common_1.ConflictException('Lottery type code already exists');
            }
        }
        const afterState = await this.prisma.lotteryType.update({
            where: { id },
            data: updateLotteryTypeDto,
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'LotteryType',
                entityId: id,
                action: 'UPDATE',
                beforeState: JSON.parse(JSON.stringify(beforeState)),
                afterState: JSON.parse(JSON.stringify(afterState)),
            },
        });
        return afterState;
    }
    async remove(id) {
        const beforeState = await this.findOne(id);
        const afterState = await this.prisma.lotteryType.update({
            where: { id },
            data: { isActive: false },
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'LotteryType',
                entityId: id,
                action: 'DELETE',
                beforeState: JSON.parse(JSON.stringify(beforeState)),
                afterState: JSON.parse(JSON.stringify(afterState)),
            },
        });
        return afterState;
    }
};
exports.LotteryTypesService = LotteryTypesService;
exports.LotteryTypesService = LotteryTypesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LotteryTypesService);
//# sourceMappingURL=lottery-types.service.js.map