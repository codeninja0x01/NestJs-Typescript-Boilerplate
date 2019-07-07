import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../../../decorators/user.gql-decorator';
import { GqlAuthGuard } from '../../auth/gql.auth';
import { UserAddressDto } from '../dto/user-address.dto';
import { UserUpdateDto } from '../dto/user-update.dto';
import { User as UserModel } from '../user.model';
import { UserService } from '../user.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {

    constructor(
        private readonly userService: UserService
    ) { }

    @Mutation()
    public updateUser(@Args('userInput') userInput: UserUpdateDto, @User() userId: number): Promise<UserModel> {
        return this.userService.update(userInput, userId);
    }

    @Mutation()
    public updateAddress(@Args('addressInput') addressInput: UserAddressDto, @User() userId: number): Promise<UserModel> {
        return this.userService.address(addressInput, userId);
    }

    @Query()
    public getUser(@User() user: UserModel): UserModel {
        return user;
    }

}
