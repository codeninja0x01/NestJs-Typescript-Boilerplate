import { Args, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { AttributeValue } from '../attribute-value.model';
import { Attribute } from '../attribute.model';
import { AttributeService } from '../attribute.service';

@Resolver('Attribute')
export class AttributeResolver {
    constructor(
        private readonly attributeService: AttributeService
    ) { }

    @Query()
    public getAttributes(): Promise<Attribute[]> {
        return this.attributeService.findAll();
    }

    @Query()
    public getAttribute(@Args('id') id: number): Promise<Attribute> {
        return this.attributeService.findOne(id);
    }

    @ResolveProperty()
    public values(@Parent() attribute: Attribute): Promise<AttributeValue[]> {
      const { id } = attribute;
      return this.attributeService.findAttributeValue(id);
    }

}
