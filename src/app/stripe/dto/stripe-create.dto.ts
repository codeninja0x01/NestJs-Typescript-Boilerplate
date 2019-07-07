import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

enum CURRENCY {
    USD = 'USD',
    ERO = 'EUR',
}

export class StripeCreateDto {
    @IsNotEmpty()
    public orderId: number;

    public description?: string;

    @IsOptional()
    @IsEnum(CURRENCY)
    public currency?: CURRENCY = CURRENCY.USD;

    public paymentMethodId?: string;

    public paymentIntentId?: string;
}
