import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { Category } from './category.model';
import { CategoryService } from './category.service';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { CategoryQueryDto } from './dto/category-query.dto';

@Controller('categories')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  public async getCategories(@Query() pagination: CategoryQueryDto): Promise<CategoryPaginationDto> {
    return this.categoryService.findAll(pagination);
  }

  @Get(':id')
  public findCategory(@Param('id', new ParseIntPipe()) id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Get('product/:productId')
  public findProductCategory(@Param('productId', new ParseIntPipe()) productId: number): Promise<Category[]> {
    return this.categoryService.findByProduct(productId);
  }

  @Get('department/:departmentId')
  public findDepartmentCategory(@Param('departmentId', new ParseIntPipe()) departmentId: number): Promise<Category[]> {
    return this.categoryService.findByDepartment(departmentId);
  }

}
