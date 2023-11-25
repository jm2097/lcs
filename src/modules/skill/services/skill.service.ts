import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { SkillCreateDto, SkillDto, SkillUpdateDto } from '../dto/skill.dto';

@Injectable()
export class SkillService {
	constructor(private readonly prisma: PrismaService) {}

	async getSkillByUserId(userId: number): Promise<SkillDto[]> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new NotFoundException(`User not found by ID ${userId}`);
		}

		return this.prisma.skill.findMany({
			where: {
				userId,
			},
		});
	}

	createSkill(data: SkillCreateDto): Promise<SkillDto> {
		return this.prisma.skill.create({ data });
	}

	async updateSkill(id: number, data: SkillUpdateDto): Promise<SkillDto> {
		const skill = await this.prisma.skill.findUnique({
			where: { id },
		});

		if (!skill) {
			throw new NotFoundException(`Skill not found by ID ${id}`);
		}

		return this.prisma.skill.update({
			data,
			where: { id },
		});
	}

	async deleteSkill(id: number): Promise<SkillDto> {
		const skill = await this.prisma.skill.findUnique({
			where: { id },
		});

		if (!skill) {
			throw new NotFoundException(`Skill not found by ID ${id}`);
		}

		return this.prisma.skill.delete({
			where: { id },
		});
	}
}
