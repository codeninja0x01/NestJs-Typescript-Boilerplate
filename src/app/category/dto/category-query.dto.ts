import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { ORDER, ORDER_BY } from '../../../generated/graphql';

export class CategoryQueryDto  {
    @IsOptional()
    @IsNumberString()
    public offset?: number;

    @IsOptional()
    @IsNumberString()
    public limit?: number;

    @IsOptional()
    @IsEnum(ORDER_BY, {
        message: 'orderBy must be a id/name',
    })
    public orderBy?: ORDER_BY = ORDER_BY.name;

    @IsOptional()
    @IsEnum(ORDER, {
        message: 'order must be a ASC/DESC',
    })
    public order?: ORDER = ORDER.ASC;
}
