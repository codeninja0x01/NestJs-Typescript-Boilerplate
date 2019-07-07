import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../../decorators/user.http-decorator';
import { OrderCrateDto } from './dto/order-create.dto';
import { OrderDetail } from './order-detail.model';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrderController {

  constructor(private readonly orderService: OrderService) { }

  @Post()
  public addOrder(@Body() order: OrderCrateDto, @User('id') userId: number): Promise<Order> {
    return this.orderService.addOrder(order, userId);
  }

  @Get('customer')
  public currentOrder(@User('id') userId: number): Promise<Order[]> {
    return this.orderService.currentOrder(userId);
  }

  @Get(':id')
  public findOrder(@Param('id', new ParseIntPipe()) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Get(':id/detail')
  public findOrderDetail(@Param('id', new ParseIntPipe()) id: number): Promise<OrderDetail[]> {
    return this.orderService.orderDetail(id);
  }

}
