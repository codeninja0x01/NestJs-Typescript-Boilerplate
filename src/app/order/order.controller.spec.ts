import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Cart } from '../cart/cart.model';
import { Shipping } from '../shipping/shipping.model';
import { Tax } from '../tax/tax.model';
import { OrderCrateDto } from './dto/order-create.dto';
import { OrderDetail } from './order-detail.model';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

describe('OrderController', () => {
    let orderController: OrderController;
    let orderService: OrderService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
            PassportModule.register({ defaultStrategy: 'jwt' }),
            ],
            controllers: [OrderController],
            providers: [OrderService,
            {
                provide: getRepositoryToken(Order),
                useValue: {},
            },
            {
                provide: getRepositoryToken(Tax),
                useValue: {},
            },
            {
                provide: getRepositoryToken(Shipping),
                useValue: {},
            },
            {
                provide: getRepositoryToken(OrderDetail),
                useValue: {},
            },
            {
                provide: getRepositoryToken(Cart),
                useValue: {},
            },
        ],
        }).compile();

        orderController = module.get<OrderController>(OrderController);
        orderService = module.get<OrderService>(OrderService);
    });

    describe('AddOrder', () => {
        it('Should return created order', async () => {
            const orderDto: OrderCrateDto = {
                cartKey: '',
                shippingId: 1,
                taxId: 1,
            };

            const result: Order = {
                id: 1,
                authCode: '',
                comments: '',
                createdAt: new Date(),
                reference: '',
                shippedOn: new Date(),
                status: 0,
                totalAmount: 500,
                userId: 1,
                taxId: 1,
                shippingId: 1,
            };

            jest.spyOn(orderService, 'addOrder').mockImplementation(() => Promise.resolve(result));
            expect(await orderController.addOrder(orderDto, 1)).toBe(result);
        });
    });

    describe('CustomerOrder', () => {
        it('Should return array of customer order', async () => {
            const result: Order[] = [{
                id: 1,
                authCode: '',
                comments: '',
                createdAt: new Date(),
                reference: '',
                shippedOn: new Date(),
                status: 0,
                totalAmount: 500,
                userId: 1,
                taxId: 1,
                shippingId: 1,
            }];

            jest.spyOn(orderService, 'currentOrder').mockImplementation(() => Promise.resolve(result));
            expect(await orderController.currentOrder(1)).toBe(result);
        });
    });
});
