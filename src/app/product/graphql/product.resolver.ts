import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { User } from '../../../decorators/user.gql-decorator';
import { GqlAuthGuard } from '../../auth/gql.auth';
import { ProductPaginationDto } from '../dto/product-pagination.dto';
import { ProductQueryDto } from '../dto/product-query.dto';
import { ProductCreateReviewDto } from '../dto/product-review-create.dto';
import { ProductReviewDto } from '../dto/product-review.dto';
import { ProductSearchDto } from '../dto/product-search.dto';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Resolver(() => Product)
export class ProductResolver {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Query()
    public getProducts(@Args('paginationInput') paginationInput: ProductQueryDto): Promise<ProductPaginationDto> {
        return this.productService.findAll(paginationInput);
    }

    @Mutation()
    @UseGuards(GqlAuthGuard)
    public addProductReview(@Args('reviewInput') reviewInput: ProductCreateReviewDto, @Args('id') id: number,
                            @User('id') userId: number): Promise<ProductReviewDto[]> {
        return this.productService.createReview(reviewInput, id, userId);
    }

    @Query()
    public getProduct(@Args('id') id: string): Promise<Product> {
        return this.productService.findOne(id as any);
    }

    @Query()
    public searchProduct(@Args('searchInput') query: ProductSearchDto, @Args('paginationInput') paginate: ProductQueryDto): Promise<ProductPaginationDto> {
        return this.productService.search(query, paginate);
    }
}
