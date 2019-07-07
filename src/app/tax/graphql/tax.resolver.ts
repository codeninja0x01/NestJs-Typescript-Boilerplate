import { Args, Query, Resolver } from '@nestjs/graphql';

import { Tax } from '../tax.model';
import { TaxService } from '../tax.service';

@Resolver()
export class TaxResolver {

    constructor(
        private readonly taxService: TaxService
    ) { }

    @Query()
    public getTaxs(): Promise<Tax[]> {
        return this.taxService.findAll();
    }

    @Query()
    public getTax(@Args('id') id: number): Promise<Tax> {
        return this.taxService.findOne(id);
    }

}
