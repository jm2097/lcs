import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserCreateDto, UserDto, UserUpdateDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller({
	path: 'users',
})
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getUsers(): Promise<UserDto[]> {
		return this.userService.getUsers();
	}

	@Get(':id')
	getUserById(@Param('id') id: number): Promise<UserDto> {
		return this.userService.getUserById(id);
	}

	@Post()
	createUser(@Body() data: UserCreateDto): Promise<UserDto> {
		return this.userService.createUser(data);
	}

	@Put(':id')
	updateUser(@Param('id') id: number, @Body() data: UserUpdateDto): Promise<UserDto> {
		return this.userService.updateUser(id, data);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number): Promise<UserDto> {
		return this.userService.deleteUser(id);
	}
}
