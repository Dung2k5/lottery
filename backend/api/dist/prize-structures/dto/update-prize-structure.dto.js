"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrizeStructureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prize_structure_dto_1 = require("./create-prize-structure.dto");
class UpdatePrizeStructureDto extends (0, mapped_types_1.PartialType)(create_prize_structure_dto_1.CreatePrizeStructureDto) {
}
exports.UpdatePrizeStructureDto = UpdatePrizeStructureDto;
//# sourceMappingURL=update-prize-structure.dto.js.map