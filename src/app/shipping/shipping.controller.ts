import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { Shipping } from './shipping.model';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) { }

  @Get()
  public getShippings(): Promise<Shipping[]> {
    return this.shippingService.findAll();
  }

  @Get('region/:id')
  public findShippingRegion(@Param('id', new ParseIntPipe()) id: number): Promise<Shipping> {
    return this.shippingService.region(id);
  }

}
