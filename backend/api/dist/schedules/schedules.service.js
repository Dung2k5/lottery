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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SchedulesService = class SchedulesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createScheduleDto) {
        const existing = await this.prisma.drawSchedule.findFirst({
            where: {
                stationId: createScheduleDto.stationId || null,
                lotteryTypeId: createScheduleDto.lotteryTypeId,
                dayOfWeek: createScheduleDto.dayOfWeek,
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Schedule already exists for this station, lottery type, and day');
        }
        return this.prisma.drawSchedule.create({ data: createScheduleDto });
    }
    findAll() {
        return this.prisma.drawSchedule.findMany({
            include: {
                station: {
                    include: {
                        region: true,
                        province: true,
                    },
                },
                lotteryType: true,
            },
            orderBy: [
                { dayOfWeek: 'asc' },
                { drawTime: 'asc' },
            ]
        });
    }
    async findOne(id) {
        const schedule = await this.prisma.drawSchedule.findUnique({
            where: { id },
            include: {
                station: {
                    include: {
                        region: true,
                        province: true,
                    },
                },
                lotteryType: true,
            },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Schedule not found');
        return schedule;
    }
    async findByDay(dayOfWeek) {
        return this.prisma.drawSchedule.findMany({
            where: { dayOfWeek, isActive: true },
            include: {
                station: {
                    include: {
                        region: true,
                        province: true,
                    },
                },
                lotteryType: true,
            },
            orderBy: { drawTime: 'asc' },
        });
    }
    async update(id, updateScheduleDto) {
        const existing = await this.findOne(id);
        if (updateScheduleDto.dayOfWeek !== undefined || updateScheduleDto.stationId || updateScheduleDto.lotteryTypeId) {
            const duplicate = await this.prisma.drawSchedule.findFirst({
                where: {
                    stationId: updateScheduleDto.stationId !== undefined ? (updateScheduleDto.stationId || null) : existing.stationId,
                    lotteryTypeId: updateScheduleDto.lotteryTypeId || existing.lotteryTypeId,
                    dayOfWeek: updateScheduleDto.dayOfWeek !== undefined ? updateScheduleDto.dayOfWeek : existing.dayOfWeek,
                    NOT: { id },
                },
            });
            if (duplicate) {
                throw new common_1.ConflictException('Schedule already exists for this station, lottery type, and day');
            }
        }
        return this.prisma.drawSchedule.update({
            where: { id },
            data: updateScheduleDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.drawSchedule.delete({ where: { id } });
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map