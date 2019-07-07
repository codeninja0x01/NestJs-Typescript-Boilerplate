import { IsCreditCard, IsOptional } from 'class-validator';

import { UserUpdateInput } from '../../../generated/graphql';

export class UserUpdateDto extends UserUpdateInput {
    @IsOptional()
    public name: string;

    @IsOptional()
    public password: string;

    @IsOptional()
    public dayPhone: string;

    @IsOptional()
    public evePhone: string;

    @IsOptional()
    public mobPhone: string;

    @IsOptional()
    @IsCreditCard()
    public creditCard: string;
}
