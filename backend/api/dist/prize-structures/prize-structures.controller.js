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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrizeStructuresController = void 0;
const common_1 = require("@nestjs/common");
const prize_structures_service_1 = require("./prize-structures.service");
const create_prize_structure_dto_1 = require("./dto/create-prize-structure.dto");
const update_prize_structure_dto_1 = require("./dto/update-prize-structure.dto");
let PrizeStructuresController = class PrizeStructuresController {
    prizeStructuresService;
    constructor(prizeStructuresService) {
        this.prizeStructuresService = prizeStructuresService;
    }
    create(createPrizeStructureDto) {
        return this.prizeStructuresService.create(createPrizeStructureDto);
    }
    findAll() {
        return this.prizeStructuresService.findAll();
    }
    findOne(id) {
        return this.prizeStructuresService.findOne(id);
    }
    update(id, updatePrizeStructureDto) {
        return this.prizeStructuresService.update(id, updatePrizeStructureDto);
    }
    remove(id) {
        return this.prizeStructuresService.remove(id);
    }
};
exports.PrizeStructuresController = PrizeStructuresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prize_structure_dto_1.CreatePrizeStructureDto]),
    __metadata("design:returntype", void 0)
], PrizeStructuresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrizeStructuresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrizeStructuresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prize_structure_dto_1.UpdatePrizeStructureDto]),
    __metadata("design:returntype", void 0)
], PrizeStructuresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PrizeStructuresController.prototype, "remove", null);
exports.PrizeStructuresController = PrizeStructuresController = __decorate([
    (0, common_1.Controller)('prize-structures'),
    __metadata("design:paramtypes", [prize_structures_service_1.PrizeStructuresService])
], PrizeStructuresController);
//# sourceMappingURL=prize-structures.controller.js.map