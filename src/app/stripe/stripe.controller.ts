import { Body, Controller, Post } from '@nestjs/common';

import { StripeCreateDto } from './dto/stripe-create.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('charge')
  public charge(@Body() stripe: StripeCreateDto): Promise<void> {
      return this.stripeService.charge(stripe);
  }
}
