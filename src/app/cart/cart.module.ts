import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartController } from './cart.controller';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { CartResolver } from './graphql/cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CartController],
  providers: [CartService, CartResolver],
})
export class CartModule {}
