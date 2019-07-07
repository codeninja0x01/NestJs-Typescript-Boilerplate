import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../../../decorators/user.gql-decorator';
import { GqlAuthGuard } from '../../auth/gql.auth';
import { OrderCrateDto } from '../dto/order-create.dto';
import { Order } from '../order.model';
import { OrderService } from '../order.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class OrderResolver {

    constructor(
        private readonly orderService: OrderService
    ) { }

    @Mutation()
    public addOrder(@Args('orderInput') orderInput: OrderCrateDto, @User('id') userId: number): Promise<Order> {
        return this.orderService.addOrder(orderInput, userId);
    }

    @Query()
    public currentOrder(@User('id') userId: number): Promise<Order[]> {
        return this.orderService.currentOrder(userId);
    }

    @Query()
    public findOrder(@Args('id') id: number): Promise<Order> {
        return this.orderService.findOne(id);
    }
}
