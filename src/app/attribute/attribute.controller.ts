import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { AttributeValue } from './attribute-value.model';
import { Attribute } from './attribute.model';
import { AttributeService } from './attribute.service';
import { AttributeProductDto } from './dto/attribute-product.dto';

@Controller('attributes')
export class AttributeController {

  constructor(private readonly attributeService: AttributeService) { }

  @Get()
  public getAttributes(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Get(':id')
  public findAttribute(@Param('id', new ParseIntPipe()) id: number): Promise<Attribute> {
    return this.attributeService.findOne(id);
  }

  @Get('product/:productId')
  public findByProduct(@Param('productId', new ParseIntPipe()) productId: number): Promise<AttributeProductDto[]> {
    return this.attributeService.findByProduct(productId);
  }

  @Get('value/:id')
  public findAttributeValue(@Param('id', new ParseIntPipe()) id: number): Promise<AttributeValue[]> {
    return this.attributeService.findAttributeValue(id);
  }
}
