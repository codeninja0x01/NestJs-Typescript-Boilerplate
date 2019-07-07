import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CartService } from '../cart.service';
import { CartDto } from '../dto/cart-create.dto';
import { CartProductDto } from '../dto/cart-product.dto';

@Resolver('Cart')
export class CartResolver {
    constructor(
        private readonly cartService: CartService
    ) { }

    @Mutation()
    public async addCart(@Args('cartDto') cartDto: CartDto): Promise<CartProductDto[]> {
        return this.cartService.createCart(cartDto);
    }

    @Mutation()
    public addQuantity(@Args('id') id: number, @Args('quantity') quantity: number):
    Promise<CartProductDto[]> {
        return this.cartService.addQuantity(id, quantity);
    }

    @Mutation()
    public removeCart(@Args('cartKey') cartKey: string): Promise<void> {
        return this.cartService.removeCart(cartKey);
    }

    @Mutation()
    public removeProductCart(@Args('productId') productId: number): Promise<void> {
        return this.cartService.removeProduct(productId);
    }

    @Query()
    public generateCartKey(): string {
        return this.cartService.generateCartkey();
    }

    @Query()
    public async getCartProduct(@Args('cartKey') cartKey: string): Promise<CartProductDto[]> {
        return await this.cartService.cartProducts(cartKey, true);
    }
}
