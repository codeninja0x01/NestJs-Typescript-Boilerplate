import { IsNotEmpty, IsNumberString } from 'class-validator';

import { ReviewInput } from '../../../generated/graphql';

export class ProductCreateReviewDto extends ReviewInput {
    @IsNotEmpty()
    public review: string;

    @IsNumberString()
    public rating: number;
}
