import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SkillCreateDto, SkillDto, SkillUpdateDto } from '../dto/skill.dto';
import { SkillService } from '../services/skill.service';

@Controller({
	path: 'skills',
})
export class SkillController {
	constructor(private readonly skillService: SkillService) {}

	@Get(':userId')
	getSkillByUserId(@Param('userId') userId: number): Promise<SkillDto[]> {
		return this.skillService.getSkillByUserId(userId);
	}

	@Post()
	createUser(@Body() data: SkillCreateDto): Promise<SkillDto> {
		return this.skillService.createSkill(data);
	}

	@Put(':id')
	updateUser(@Param('id') id: number, @Body() data: SkillUpdateDto): Promise<SkillDto> {
		return this.skillService.updateSkill(id, data);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number): Promise<SkillDto> {
		return this.skillService.deleteSkill(id);
	}
}
