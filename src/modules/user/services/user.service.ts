import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dto/user.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	getUsers(): Promise<UserDto[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: number): Promise<UserDto> {
		const user = await this.prisma.user.findUnique({
			include: { skills: true },
			where: { id },
		});

		if (!user) {
			throw new NotFoundException(`User not found by ID ${id}`);
		}

		return user;
	}

	createUser(data: UserCreateDto): Promise<UserDto> {
		return this.prisma.user.create({ data });
	}

	async updateUser(id: number, data: UserUpdateDto): Promise<UserDto> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException(`User not found by ID ${id}`);
		}

		return this.prisma.user.update({
			data,
			where: { id },
		});
	}

	async deleteUser(id: number): Promise<UserDto> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});

		if (!user) {
			throw new NotFoundException(`User not found by ID ${id}`);
		}

		return this.prisma.user.update({
			data: { isRemoved: true },
			where: { id },
		});
	}
}
