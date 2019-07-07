import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AttributeValue } from './attribute-value.model';
import { AttributeController } from './attribute.controller';
import { Attribute } from './attribute.model';
import { AttributeService } from './attribute.service';
import { AttributeResolver } from './graphql/attribute.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute, AttributeValue])],
  controllers: [AttributeController],
  providers: [AttributeService, AttributeResolver],
})
export class AttributeModule {}
