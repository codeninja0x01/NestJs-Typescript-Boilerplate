import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShippingResolver } from './graphql/shipping.resolver';
import { ShippingRegion } from './shipping-region.model';
import { ShippingController } from './shipping.controller';
import { Shipping } from './shipping.model';
import { ShippingService } from './shipping.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shipping, ShippingRegion])],
  controllers: [ShippingController],
  providers: [ShippingService, ShippingResolver],
})
export class ShippingModule {}
