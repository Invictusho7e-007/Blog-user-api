import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import userData from './user-data/userData';
import { log } from 'console';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      createdAt: new Date(),
      isActive: true,
      id: userData.length + 1,
    };
    userData.push(newUser);

    return newUser;
  }

  findAllUser() {
    return userData;
  }

  findOneUser(id: number) {
    const user = userData.find((user) => user.id === id);
    if (user) {
      return { code: 200, user, message: `user with ID ${id} found ` };
    }
    if (!user) {
      throw new Error(`user with ID ${id} not found`);
    }
  }

  findUserByActiveStatus(@Query('isActive') isActive: boolean) {
    const activeUser = userData.filter((user) => user.isActive === true);
    console.log(activeUser);

    if (activeUser) {
      return { code: 200, activeUser, message: `All active users found` };
    }
    const notActive = userData.filter((user) => user.isActive === false);
    return {
      code: 200,
      notActive,
      message: `All deactivated users found`,
    };
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
  updateUserData(id: number, updateUserDto: UpdateUserDto) {
    const user = userData.find((user) => user.id === id);
    if (user) {
      user.name = updateUserDto.name ?? user.name;
      user.email = updateUserDto.email ?? user.email;
      return {
        message: `User with ID ${id} updated successfully`,
        code: 200,
        user,
      };
    } else {
      throw new Error(`user with ID ${id} not found`);
    }
  }

  removeUser(id: number) {
    const user = userData.find((user) => user.id === id);
    if (user) {
      userData.splice(userData.indexOf(user), 1);
      return {
        message: `User with ID ${id} removed successfully`,
        code: 200,
        userData,
      };
    } else {
      throw new Error(`user with ID ${id} not found`);
    }
  }
}
