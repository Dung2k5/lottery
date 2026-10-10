"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_js_1 = require("./app.controller.js");
const app_service_js_1 = require("./app.service.js");
const lottery_types_module_js_1 = require("./lottery-types/lottery-types.module.js");
const prize_structures_module_js_1 = require("./prize-structures/prize-structures.module.js");
const prisma_module_js_1 = require("./prisma/prisma.module.js");
const regions_module_1 = require("./regions/regions.module");
const provinces_module_1 = require("./provinces/provinces.module");
const stations_module_1 = require("./stations/stations.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [lottery_types_module_js_1.LotteryTypesModule, prize_structures_module_js_1.PrizeStructuresModule, prisma_module_js_1.PrismaModule, regions_module_1.RegionsModule, provinces_module_1.ProvincesModule, stations_module_1.StationsModule],
        controllers: [app_controller_js_1.AppController],
        providers: [app_service_js_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map