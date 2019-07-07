import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../../decorators/user.http-decorator';
import { UserAddressDto } from './dto/user-address.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User as UserModel } from './user.model';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUser(@User() user: UserModel): Promise<UserModel> {
    return user;
  }

  @Post()
  public updateUser(@Body() userInput: UserUpdateDto, @User('id') userId: number): Promise<UserModel> {
    return this.userService.update(userInput, userId);
  }

  @Post('address')
  public async updateAddress(@Body() addressInput: UserAddressDto, @User('id') userId: number): Promise<UserModel> {
    return this.userService.address(addressInput, userId);
  }
}
