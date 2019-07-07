import { Stripe } from 'stripe';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Order } from '../order/order.model';
import { StripeCreateDto } from './dto/stripe-create.dto';

const stripe = new Stripe('sk_test_ft8nzuqMvME8Lyf48q4SIMHr00QhoPkLqm');

@Injectable()
export class StripeService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    public async charge(stripeInput: StripeCreateDto): Promise<any> {
        let intent;

        const order = await this.orderRepository.findOne(stripeInput.orderId);

        if (stripeInput.paymentMethodId !== undefined) {
            intent = await stripe.paymentIntents.create({
                payment_method: stripeInput.paymentMethodId,
                amount: order.totalAmount,
                description: stripeInput.description,
                currency: stripeInput.currency,
                confirmation_method: 'manual',
                confirm: true,
            });
        } else if (stripeInput.paymentIntentId !== undefined) {
            intent = await stripe.paymentIntents.confirm(stripeInput.paymentIntentId);
        }
        return this.generate_payment_response(intent, order);
    }

    public generate_payment_response = (intent, order: Order) => {
        if (
          intent.status === 'requires_action' &&
          intent.next_action.type === 'use_stripe_sdk'
        ) {
          // Tell the client to handle the action
          return {
            requires_action: true,
            payment_intent_client_secret: intent.client_secret,
          };
        } else if (intent.status === 'succeeded') {
          // The payment didn’t need any additional actions and completed!
          // Handle post-payment fulfillment
          this.orderRepository.update({id: order.id}, {status: 1, authCode: intent.id, comments: intent.description});
          return {
            success: true,
          };
        } else {
          // Invalid status
          return {
            error: 'Invalid PaymentIntent status',
          };
        }
      }
}
