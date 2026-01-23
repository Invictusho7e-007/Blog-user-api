import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import userData from './user-data/userData';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAllUser() {
    return userData;
  }

  findOneUser(id: number) {
    const user = userData.find((user) => user.id === id);
    if (user) {
      return { code: 200, user, message: `user with ID ${id} found ` };
    } else {
      throw new HttpException({  message: `user with ID ${id} not found` }, 404);
    }
  }

  updateUserStatus(id: number, updateUserDto: UpdateUserDto) {
    const user = userData.find((user) => user.id === id);

    if (user && user.isActive === true) {
      user.isActive = false;

      return {
        message: `User with ID ${id} deactivated successfully`,
        code: 200,
        userData,
      };
    }

    if (user && user.isActive === false) {
      return {
        message: `User with ID ${id} is already deactivated`,
        code: 400,
        userData,
      };
    }
    if (!user) {
      return {
        message: `User with ID ${id} not found`,
        code: 404,
        userData,
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
