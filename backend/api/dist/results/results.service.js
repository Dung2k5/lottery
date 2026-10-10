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
exports.ResultsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ResultsService = class ResultsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const existing = await this.prisma.drawSession.findFirst({
            where: {
                lotteryTypeId: createDto.lotteryTypeId,
                stationId: createDto.stationId || null,
                drawDate: new Date(createDto.drawDate),
            }
        });
        if (existing) {
            throw new common_1.ConflictException('Draw session already exists for this date');
        }
        return this.prisma.drawSession.create({
            data: {
                lotteryTypeId: createDto.lotteryTypeId,
                stationId: createDto.stationId,
                drawDate: new Date(createDto.drawDate),
                drawCode: createDto.drawCode,
                dataSourceId: createDto.dataSourceId,
                status: client_1.DrawStatus.DRAFT,
                results: {
                    create: createDto.results.map((r, index) => ({
                        prizeCode: r.prizeCode,
                        prizeName: r.prizeName,
                        winningNumbers: r.winningNumbers,
                        order: r.order ?? index,
                    }))
                }
            },
            include: { results: true }
        });
    }
    async findAll(date, lotteryTypeId) {
        const where = {};
        if (date) {
            const d = new Date(date);
            where.drawDate = {
                gte: new Date(d.setHours(0, 0, 0, 0)),
                lt: new Date(d.setHours(23, 59, 59, 999))
            };
        }
        if (lotteryTypeId) {
            where.lotteryTypeId = lotteryTypeId;
        }
        return this.prisma.drawSession.findMany({
            where,
            include: { results: true }
        });
    }
    async findOne(id) {
        const session = await this.prisma.drawSession.findUnique({
            where: { id },
            include: { results: true, revisions: true }
        });
        if (!session)
            throw new common_1.NotFoundException('Draw session not found');
        return session;
    }
    async update(id, updateDto) {
        const session = await this.findOne(id);
        if (session.status === client_1.DrawStatus.PUBLISHED) {
            if (!updateDto.reason) {
                throw new common_1.BadRequestException('Reason is required when updating a published draw session');
            }
            await this.prisma.resultRevision.create({
                data: {
                    drawSessionId: session.id,
                    previousData: session.results,
                    reason: updateDto.reason,
                }
            });
        }
        await this.prisma.prizeResult.deleteMany({ where: { drawSessionId: id } });
        return this.prisma.drawSession.update({
            where: { id },
            data: {
                status: session.status === client_1.DrawStatus.PUBLISHED ? client_1.DrawStatus.REVISED : session.status,
                results: {
                    create: updateDto.results.map((r, index) => ({
                        prizeCode: r.prizeCode,
                        prizeName: r.prizeName,
                        winningNumbers: r.winningNumbers,
                        order: r.order ?? index,
                    }))
                }
            },
            include: { results: true }
        });
    }
    async publish(id) {
        const session = await this.findOne(id);
        if (session.status === client_1.DrawStatus.PUBLISHED) {
            throw new common_1.BadRequestException('Already published');
        }
        return this.prisma.drawSession.update({
            where: { id },
            data: {
                status: client_1.DrawStatus.PUBLISHED,
                publishedAt: new Date(),
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.drawSession.delete({ where: { id } });
    }
};
exports.ResultsService = ResultsService;
exports.ResultsService = ResultsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResultsService);
//# sourceMappingURL=results.service.js.map