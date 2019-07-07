import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AttributeValue } from './attribute-value.model';
import { Attribute } from './attribute.model';
import { AttributeProductDto } from './dto/attribute-product.dto';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeValue)
    private readonly attributeValueRepository: Repository<AttributeValue>
  ) {}

  public findAll(): Promise<Attribute[]> {
    return this.attributeRepository.find();
  }

  public findOne(id: number): Promise<Attribute> {
    return this.attributeRepository.findOne(id);
  }

  public async findByProduct(id: number): Promise<AttributeProductDto[]> {
    const attributeValues = await this.attributeValueRepository
        .createQueryBuilder('attributeValue')
        .innerJoinAndSelect('attributeValue.attribute', 'attribute')
        .select(['attribute.name', 'attributeValue.id', 'attributeValue.name'])
        .where(qb => {
            const subQuery = qb.subQuery()
            .select('attribute_value_id')
            .from('product_attributes', 'product_attribute')
            .where('product_id = :id')
            .getQuery();
            return 'attributeValue.id IN ' + subQuery;
        })
        .cache(true)
        .setParameter('id', id)
        .getMany();
    const result: AttributeProductDto[] = [];

    await Object.keys(attributeValues).forEach(key => {
        result.push({
            id: attributeValues[key].id,
            name: attributeValues[key].attribute.name,
            value: attributeValues[key].name,
        });
    });

    return result;
  }

  public findAttributeValue(attributeId: number): Promise<AttributeValue[]> {
    return this.attributeValueRepository.find({where: {attributeId}, select: ['id', 'name']});
  }

}
