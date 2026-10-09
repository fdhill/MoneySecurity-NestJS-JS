import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ok, created } from '../utils';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  userService;

  constructor(userService) {
    this.userService = userService;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll() {
    const users = await this.userService.findAll();
    return ok('Users retrieved successfully', users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(req) {
    const { id } = req.params;
    const user = await this.userService.findById(id);
    return ok('User retrieved successfully', user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  async create(req) {
    const dto = req.body;
    const user = await this.userService.create(dto);
    return created('User created successfully', user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(req) {
    const { id } = req.params;
    const dto = req.body;
    const user = await this.userService.update(id, dto);
    return ok('User updated successfully', user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async delete(req) {
    const { id } = req.params;
    await this.userService.delete(id);
    return ok('User deleted successfully', null);
  }
}
