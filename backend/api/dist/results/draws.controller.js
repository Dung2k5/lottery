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
exports.DrawsController = void 0;
const common_1 = require("@nestjs/common");
const results_service_1 = require("./results.service");
let DrawsController = class DrawsController {
    resultsService;
    constructor(resultsService) {
        this.resultsService = resultsService;
    }
    async getDrawsByDate(dateString, regionCode) {
        if (!dateString) {
            dateString = new Date().toISOString().split('T')[0];
        }
        return this.resultsService.getPublicDrawsByDate(dateString, regionCode);
    }
    async getLatestDraws(regionCode) {
        return this.resultsService.getLatestPublicDraws(regionCode);
    }
};
exports.DrawsController = DrawsController;
__decorate([
    (0, common_1.Get)('by-date'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('regionCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DrawsController.prototype, "getDrawsByDate", null);
__decorate([
    (0, common_1.Get)('latest'),
    __param(0, (0, common_1.Query)('regionCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DrawsController.prototype, "getLatestDraws", null);
exports.DrawsController = DrawsController = __decorate([
    (0, common_1.Controller)('draws'),
    __metadata("design:paramtypes", [results_service_1.ResultsService])
], DrawsController);
//# sourceMappingURL=draws.controller.js.map