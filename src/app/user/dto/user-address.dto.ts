import { IsNotEmpty, IsOptional } from 'class-validator';

import { UserAddressInput } from '../../../generated/graphql';

export class UserAddressDto extends UserAddressInput {

    @IsNotEmpty()
    public address1: string;

    @IsOptional()
    public address2: string;

    @IsNotEmpty()
    public city: string;

    @IsNotEmpty()
    public region: string;

    @IsNotEmpty()
    public postalCode: string;

    @IsNotEmpty()
    public country: string;

    @IsNotEmpty()
    public RegionId: number;

}
