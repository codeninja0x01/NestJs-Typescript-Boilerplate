import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from './category.model';
import { CategoryPaginationDto } from './dto/category-pagination.dto';
import { CategoryQueryDto } from './dto/category-query.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    public async findAll(pagination: CategoryQueryDto): Promise<CategoryPaginationDto> {
        const limit = pagination.limit ? pagination.limit : 20;
        const currentPage = (pagination.offset ? pagination.offset : 1);
        const offset = (currentPage - 1) * limit;

        const [categories, count] = await this.categoryRepository
            .createQueryBuilder()
            .limit(limit)
            .orderBy(pagination.orderBy, pagination.order)
            .offset(offset)
            .cache(true)
            .getManyAndCount();

        const result: CategoryPaginationDto = {
            currentPage,
            perPage: limit,
            total: count,
            row: categories as any,
        };
        return result;
    }

    public findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOne({ id });
    }

    public async findByProduct(id: number): Promise<Category[]> {
        return await this.categoryRepository
            .createQueryBuilder('category')
            .select(['category.id', 'category.name', 'category.departmentId'])
            .leftJoin('category.products', 'product')
            .where('product.id = :id', {id})
            .cache(true)
            .getMany();
    }

    public findByDepartment(id: number): Promise<Category[]> {
        return this.categoryRepository.find({ where: { departmentId: id } });
    }

}
