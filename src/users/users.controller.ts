import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAllUser() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: number) {
    try {
      return this.usersService.findOneUser(+id);
    } catch (error) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  @Get('active-status/:isActive')
  findUserByActiveStatus(@Param('isActive') isActive: boolean) {
    return this.usersService.findUserByActiveStatus(isActive);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserStatus(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    try {
      return this.usersService.removeUser(+id);
    } catch (error) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }
}
