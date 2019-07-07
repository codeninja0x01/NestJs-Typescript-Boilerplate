import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CartController } from './cart.controller';
import { Cart } from './cart.model';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart-create.dto';
import { CartProductDto } from './dto/cart-product.dto';

describe('CartController', () => {
    let cartController: CartController;
    let cartService: CartService;

    beforeAll(async () => {
        const module =  await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService, {
                provide: getRepositoryToken(Cart),
                useValue: {},
            }],
        }).compile();

        cartController = module.get<CartController>(CartController);
        cartService = module.get<CartService>(CartService);
    });

    describe('AddCart', () => {
        it('Should return an array of carts', async () => {
            const cartDto: CartDto = {
                attribute: '',
                cartKey: '',
                productId: 1,
                quantity: 1,
            };

            const results: CartProductDto[] = [{
                attribute: '',
                cartId: 1,
                image: '',
                name: '',
                price: 15,
                productId: 1,
                quantity: 1,
                subtotal: 2,
            }];

            jest.spyOn(cartService, 'createCart').mockImplementation(() => Promise.resolve(results));
            expect(await cartController.addCart(cartDto)).toBe(results);
        });
    });

    describe('UpdateQuantity', () => {
        it('Should return an array of carts', async () => {
            const results: CartProductDto[] = [{
                attribute: '',
                cartId: 1,
                image: '',
                name: '',
                price: 15,
                productId: 1,
                quantity: 2,
                subtotal: 2,
            }];

            jest.spyOn(cartService, 'addQuantity').mockImplementation(() => Promise.resolve(results));
            expect(await cartController.updateQuantity(1, 2)).toBe(results);
        });
    });
});
