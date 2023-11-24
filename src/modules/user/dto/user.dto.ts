import { OmitType, PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto implements User {
	id: number;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	headline: string;

	isRemoved: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export class UserCreateDto extends OmitType(UserDto, ['id', 'isRemoved', 'createdAt', 'updatedAt']) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
