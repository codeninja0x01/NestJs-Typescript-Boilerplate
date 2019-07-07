import { IsNotEmpty } from 'class-validator';

import { CartInput } from '../../../generated/graphql';

export class CartDto extends CartInput {
    @IsNotEmpty()
    public readonly attribute: string;
    @IsNotEmpty()
    public readonly cartKey: string;
    @IsNotEmpty()
    public readonly productId: number;
    @IsNotEmpty()
    public readonly quantity: number;
}
