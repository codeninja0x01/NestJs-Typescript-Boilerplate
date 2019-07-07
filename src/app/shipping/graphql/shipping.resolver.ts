import { Args, Query, Resolver } from '@nestjs/graphql';

import { Shipping } from '../shipping.model';
import { ShippingService } from '../shipping.service';

@Resolver()
export class ShippingResolver {

    constructor(
        private readonly shippingService: ShippingService
    ) { }

    @Query()
    public getShippings(): Promise<Shipping[]> {
        return this.shippingService.findAll();
    }

    @Query()
    public getRegion(@Args('id') id: number): Promise<Shipping> {
        return this.shippingService.region(id);
    }

}
