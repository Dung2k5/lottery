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
exports.PrizeStructuresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PrizeStructuresService = class PrizeStructuresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPrizeStructureDto) {
        const struct = await this.prisma.prizeStructure.create({
            data: createPrizeStructureDto,
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'PrizeStructure',
                entityId: struct.id,
                action: 'CREATE',
                afterState: JSON.parse(JSON.stringify(struct)),
            },
        });
        return struct;
    }
    findAll() {
        return this.prisma.prizeStructure.findMany();
    }
    async findOne(id) {
        const struct = await this.prisma.prizeStructure.findUnique({
            where: { id },
        });
        if (!struct)
            throw new common_1.NotFoundException('Prize structure not found');
        return struct;
    }
    async update(id, updatePrizeStructureDto) {
        const beforeState = await this.findOne(id);
        const afterState = await this.prisma.prizeStructure.update({
            where: { id },
            data: updatePrizeStructureDto,
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'PrizeStructure',
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
        const afterState = await this.prisma.prizeStructure.update({
            where: { id },
            data: { isActive: false },
        });
        await this.prisma.auditLog.create({
            data: {
                entityType: 'PrizeStructure',
                entityId: id,
                action: 'DELETE',
                beforeState: JSON.parse(JSON.stringify(beforeState)),
                afterState: JSON.parse(JSON.stringify(afterState)),
            },
        });
        return afterState;
    }
};
exports.PrizeStructuresService = PrizeStructuresService;
exports.PrizeStructuresService = PrizeStructuresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrizeStructuresService);
//# sourceMappingURL=prize-structures.service.js.map