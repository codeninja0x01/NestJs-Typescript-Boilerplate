import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../category/category.model';
import { ProductResolver } from './graphql/product.resolver';
import { Review } from './product-review.model';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Review, Category]), PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [ProductService, ProductResolver],
  controllers: [ProductController],
})
export class ProductModule {}
