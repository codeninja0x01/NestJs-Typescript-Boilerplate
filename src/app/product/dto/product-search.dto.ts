import { IsNotEmpty, IsOptional } from 'class-validator';

import { ProductSearchInput } from '../../../generated/graphql';

export class ProductSearchDto extends ProductSearchInput {
    @IsNotEmpty()
    public search: string;

    @IsOptional()
    public descLength?: number;
}
