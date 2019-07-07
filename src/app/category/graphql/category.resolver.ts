import { Resolver } from 'type-graphql';

import { Args, Query, ResolveProperty } from '@nestjs/graphql';

import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { CategoryPaginationDto } from '../dto/category-pagination.dto';
import { CategoryQueryDto } from '../dto/category-query.dto';

@Resolver()
export class CategoryResolver {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @ResolveProperty()
    public __resolveType(obj: any, context: any, info: any): any {
          return 'PaginationOutput';
    }

    @Query()
    public getCategories(@Args('query') query: CategoryQueryDto): Promise<CategoryPaginationDto> {
        return this.categoryService.findAll(query);
    }

    @Query()
    public getCategory(@Args('id') id: number): Promise<Category> {
        return this.categoryService.findOne(id);
    }

    @Query()
    public getCategoryByProduct(@Args('productId') productId: number): Promise<Category[]> {
        return this.categoryService.findByProduct(productId);
    }

    @Query()
    public getCategoryByDepartment(@Args('departmentId') departmentId: number): Promise<Category[]> {
        return this.categoryService.findByDepartment(departmentId);
    }
}
