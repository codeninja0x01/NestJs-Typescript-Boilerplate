import { IsNotEmpty } from 'class-validator';

import { OrderInput } from '../../../generated/graphql';

export class OrderCrateDto extends OrderInput {
    @IsNotEmpty()
    public cartKey: string;

    @IsNotEmpty()
    public taxId: number;

    @IsNotEmpty()
    public shippingId: number;
}
