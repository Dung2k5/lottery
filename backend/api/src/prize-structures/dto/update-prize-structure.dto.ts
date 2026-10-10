import { PartialType } from '@nestjs/mapped-types';
import { CreatePrizeStructureDto } from './create-prize-structure.dto';

export class UpdatePrizeStructureDto extends PartialType(CreatePrizeStructureDto) {}
