import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../../decorators/user.http-decorator';
import { ProductLocationDto } from './dto/product-location.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ProductCreateReviewDto } from './dto/product-review-create.dto';
import { ProductReviewDto } from './dto/product-review.dto';
import { ProductSearchDto } from './dto/product-search.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  public getProducts(@Query() query: ProductQueryDto): Promise<ProductPaginationDto> {
    return this.productService.findAll(query);
  }

  @Get('search')
  public searchProduct(@Query() query: ProductSearchDto, @Query() paginate: ProductQueryDto): Promise<ProductPaginationDto> {
    return this.productService.search(query, paginate);
  }

  @Get(':id')
  public findProduct(@Param('id', new ParseIntPipe()) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Get('category/:categoryId')
  public findCategoryProduct(@Query() query: ProductQueryDto, @Param('categoryId', new ParseIntPipe()) categoryId: number): Promise<Product[]> {
    return this.productService.findByCategory(categoryId, query);
  }

  @Get('department/:departmentId')
  public findDepartmentProduct(@Query() query: ProductQueryDto, @Param('departmentId', new ParseIntPipe()) departmentId: number): Promise<Product[]> {
    return this.productService.findByDepartment(departmentId, query);
  }

  @Get(':id/reviews')
  public findProductReviews(@Param('id', new ParseIntPipe()) id: number): Promise<ProductReviewDto[]> {
    return this.productService.findReview(id);
  }

  @Get(':id/location')
  public findProductLocation(@Param('id', new ParseIntPipe()) id: number): Promise<ProductLocationDto[]> {
    return this.productService.findLocation(id);
  }

  @Post(':id/reviews')
  @UseGuards(AuthGuard())
  public addProductReview(@Body() review: ProductCreateReviewDto, @Param('id', new ParseIntPipe()) id: number,
                          @User('id') userId: number): Promise<ProductReviewDto[]> {
    return this.productService.createReview(review, id, userId);
  }
}
