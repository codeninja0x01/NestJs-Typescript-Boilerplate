import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from '../category/category.model';
import { Department } from '../department/department.model';
import { ProductLocationDto } from './dto/product-location.dto';
import { ProductPaginationDto } from './dto/product-pagination.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ProductCreateReviewDto } from './dto/product-review-create.dto';
import { ProductReviewDto } from './dto/product-review.dto';
import { ProductSearchDto } from './dto/product-search.dto';
import { Review } from './product-review.model';
import { Product } from './product.model';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>
  ) { }

  public async findAll(query: ProductQueryDto = new ProductQueryDto()): Promise<ProductPaginationDto> {
    const limit = query.limit ? query.limit : 20;
    const currentPage = (query.offset ? query.offset : 1);
    const offset = (currentPage - 1) * limit;

    const [products, total] = await this.productRepository
      .createQueryBuilder()
      .take(limit)
      .orderBy(query.orderBy, query.order)
      .skip(offset)
      .getManyAndCount();

    const result: ProductPaginationDto = {
      currentPage,
      perPage: limit,
      total,
      row: products as any,
    };
    return result;
  }

  public findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ id });
  }

  public async search(query: ProductSearchDto, paginate: ProductQueryDto = new ProductQueryDto()): Promise<ProductPaginationDto> {
    const limit = paginate.limit ? paginate.limit : 20;
    const currentPage = (paginate.offset ? paginate.offset : 1);
    const descLength = query.descLength ? query.descLength : 200;
    const offset = (currentPage - 1) * limit;

    const products = await this.productRepository
      .createQueryBuilder()
      .select(['id', 'name', 'price', 'discounted_price', 'thumbnail'])
      .addSelect('IF(LENGTH(description) <= :length, description, CONCAT(LEFT(description, :length), \' ...\'))', 'description')
      .where('MATCH (name, description) AGAINST (:str IN BOOLEAN MODE)')
      .orderBy('MATCH (name, description) AGAINST (:str IN NATURAL LANGUAGE MODE)', 'DESC')
      .setParameter('str', query.search)
      .setParameter('length', descLength)
      .skip(offset)
      .take(limit)
      .cache(true)
      .getRawMany();

      const row = [];

      Object.keys(products).forEach(key => {
        row.push({
          id: products[key].id,
          name: products[key].name,
          price: products[key].price,
          discountedPrice: products[key].discounted_price,
          thumbnail: products[key].thumbnail,
          description: products[key].description,
        });
      });

      const result: ProductPaginationDto = {
        currentPage,
        perPage: limit,
        total: products.length,
        row: row as any,
      };
      return result;
  }

  public async findByCategory(categoryId: number, query: ProductQueryDto = new ProductQueryDto()): Promise<Product[]> {
    const limit = query.limit ? query.limit : 20;
    const offset = ((query.offset ? query.offset : 1) - 1) * limit;

    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.categories', 'category')
      .take(limit)
      .skip(offset)
      .where('category.id = :categoryId', { categoryId })
      .cache(true)
      .getMany();
  }

  public async findByDepartment(departmentId: number, query: ProductQueryDto = new ProductQueryDto()): Promise<Product[] | undefined> {
    const limit = query.limit ? query.limit : 20;
    const offset = ((query.offset ? query.offset : 1) - 1) * limit;

    return await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.categories', 'category')
      .take(limit)
      .skip(offset)
      .where('category.departmentId = :departmentId', { departmentId })
      .cache(true)
      .getMany();
  }

  public async findLocation(id: number): Promise<ProductLocationDto[]> {
    const products = await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category.id', 'category.name', 'category.department_id'])
      .addSelect(subQuery => {
        return subQuery.select('name').from(Department, 'department').where('id = category.department_id');
      }, 'department_name')
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('category_id')
          .from('product_categories', 'product_category')
          .where('product_id = :id')
          .getQuery();
        return 'category.id IN ' + subQuery;
      })
      .setParameter('id', id)
      .cache(true)
      .getRawMany();
    return products;
  }

  public async findReview(id: number): Promise<ProductReviewDto[]> {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .innerJoin('review.user', 'user')
      .select('user.name')
      .addSelect('review.review', 'review')
      .addSelect('review.rating', 'rating')
      .addSelect('review.created_on', 'created_on')
      .where('review.product_id = :id', { id })
      .cache(true)
      .getRawMany();
    return reviews;
  }

  public async createReview(review: ProductCreateReviewDto, productId: number, userId: number): Promise<ProductReviewDto[]> {
    await this.reviewRepository.save({
      productId,
      rating: review.rating,
      review: review.review,
      userId,
    });
    return this.findReview(productId);
  }
}
