import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findUsers(@Query('isActive') isActive: boolean) {
    return this.usersService.findUsers(isActive );
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    try {
      return this.usersService.findOneUser(id);
    } catch (error) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  @Patch('/update-status:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.updateUserStatus(id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  @Patch(':id')
  updateUserData(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserData(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.removeUser(id);
    } catch (error) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }
}
