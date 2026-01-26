import { Inject, Injectable, Query, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import userData from './user-data/userData';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel({
      createUserDto,
    });

    return await newUser.save();
  }

  async findUsers(isActive?: boolean) {
    if (isActive !== undefined) {
      return this.userModel.find({ isActive });
    }
    return this.userModel.find();
  }

  async findOneUser(id: number) {
    const user = await this.userModel.findById(id);
    if (user) {
      return { code: 200, user, message: `user with ID ${id} found ` };
    }
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  // findUserByStatus(isActive: boolean) {
  //   return userData.filter((user) => user.isActive === isActive);
  // }

  async updateUserStatus(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (user && user.isActive === true) {
      user.isActive = false;

      return {
        message: `User with ID ${id} deactivated successfully`,
        code: 200,
        user,
      };
    }

    if (user && user.isActive === false) {
      return {
        message: `User with ID ${id} is already deactivated`,
        code: 400,
        user,
      };
    }
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  async updateUserData(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (user) {
      user.name = updateUserDto.name ?? user.name;
      user.email = updateUserDto.email ?? user.email;
      return {
        message: `User with ID ${id} updated successfully`,
        code: 200,
        user,
      };
    } else {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }

  async removeUser(id: number) {
    const user = await this.userModel.findById(id);
    if (user) {
      await this.userModel.findByIdAndDelete(id);
      return {
        message: `User with ID ${id} removed successfully`,
        code: 200,
        user,
      };
    } else {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
  }
}
