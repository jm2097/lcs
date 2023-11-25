import { PickType } from '@nestjs/mapped-types';
import { Skill } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SkillDto implements Skill {
	id: number;

	@IsString()
	@IsNotEmpty()
	name: string;
	createdAt: Date;
	updatedAt: Date;

	@IsNumber()
	@IsNotEmpty()
	userId: number;
}

export class SkillCreateDto extends PickType(SkillDto, ['name', 'userId']) {}

export class SkillUpdateDto extends PickType(SkillDto, ['name']) {}
