
import { Product } from '../product.model';

export class ProductPaginationDto {
    public total: number;
    public currentPage: number;
    public perPage: number;
    public row?: Product[];
}
