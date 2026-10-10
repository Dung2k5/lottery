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
exports.TicketCheckerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const traditional_rule_1 = require("./engine/traditional-rule");
const client_1 = require("@prisma/client");
let TicketCheckerService = class TicketCheckerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkTickets(dto) {
        if (!dto.lotteryTypeCode && !dto.stationCode) {
            throw new common_1.BadRequestException('Phải cung cấp lotteryTypeCode hoặc stationCode');
        }
        const d = new Date(dto.drawDate);
        const startOfDay = new Date(d.setHours(0, 0, 0, 0));
        const endOfDay = new Date(d.setHours(23, 59, 59, 999));
        const where = {
            drawDate: {
                gte: startOfDay,
                lt: endOfDay,
            }
        };
        if (dto.lotteryTypeCode)
            where.lotteryType = { code: dto.lotteryTypeCode };
        if (dto.stationCode)
            where.station = { code: dto.stationCode };
        const drawSession = await this.prisma.drawSession.findFirst({
            where,
            include: {
                lotteryType: true,
                station: true,
                results: true,
            },
            orderBy: { createdAt: 'desc' }
        });
        if (!drawSession) {
            return { status: 'UNAVAILABLE', message: 'Không tìm thấy kỳ quay cho đài/loại hình và ngày này.' };
        }
        if (drawSession.status !== client_1.DrawStatus.PUBLISHED && drawSession.status !== client_1.DrawStatus.REVISED) {
            return { status: 'PENDING', message: 'Kỳ quay chưa được công bố chính thức.' };
        }
        const sessionData = {
            drawDate: drawSession.drawDate.toISOString(),
            lotteryTypeCode: drawSession.lotteryType.code,
            stationCode: drawSession.station?.code,
            results: drawSession.results.map(r => ({
                prizeCode: r.prizeCode,
                prizeName: r.prizeName,
                winningNumbers: r.winningNumbers,
            })),
        };
        const results = (0, traditional_rule_1.checkBatchTraditionalTickets)(dto.ticketNumbers, sessionData);
        return {
            status: 'SUCCESS',
            drawInfo: {
                lotteryName: drawSession.lotteryType.name,
                stationName: drawSession.station?.name,
                drawDate: dto.drawDate,
                status: drawSession.status,
            },
            results,
        };
    }
};
exports.TicketCheckerService = TicketCheckerService;
exports.TicketCheckerService = TicketCheckerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TicketCheckerService);
//# sourceMappingURL=ticket-checker.service.js.map