import { Category } from '../category.model';

export class CategoryPaginationDto {
    public total: number;
    public currentPage: number;
    public perPage: number;
    public row: Category[];
}
