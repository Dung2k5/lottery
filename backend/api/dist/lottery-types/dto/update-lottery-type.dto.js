"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLotteryTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lottery_type_dto_1 = require("./create-lottery-type.dto");
class UpdateLotteryTypeDto extends (0, mapped_types_1.PartialType)(create_lottery_type_dto_1.CreateLotteryTypeDto) {
}
exports.UpdateLotteryTypeDto = UpdateLotteryTypeDto;
//# sourceMappingURL=update-lottery-type.dto.js.map