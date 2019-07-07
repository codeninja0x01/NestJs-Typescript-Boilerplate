import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from '../cart/cart.model';
import { Shipping } from '../shipping/shipping.model';
import { Tax } from '../tax/tax.model';
import { OrderResolver } from './graphql/order.resolver';
import { OrderDetail } from './order-detail.model';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail, Cart, Shipping, Tax]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OrderController],
  providers: [OrderService, OrderResolver],
})
export class OrderModule {}
