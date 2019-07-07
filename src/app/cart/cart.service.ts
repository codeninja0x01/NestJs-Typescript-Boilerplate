import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cart } from './cart.model';
import { CartDto } from './dto/cart-create.dto';
import { CartProductDto } from './dto/cart-product.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>
    ) { }

    public async createCart(cart: CartDto): Promise<CartProductDto[]> {
        const quantity = cart.quantity ? cart.quantity : 1;
        const cartResult = await this.cartRepository
            .createQueryBuilder()
            .where('attribute = :attribute', { attribute: cart.attribute })
            .andWhere('cart_key = :cartKey', { cartKey: cart.cartKey })
            .andWhere('product_id = :productId', { productId: cart.productId })
            .getOne();

        if (cartResult === undefined) {
            await this.cartRepository
                .createQueryBuilder()
                .insert()
                .into(Cart)
                .values({ attribute: cart.attribute, cartKey: cart.cartKey, productId: cart.productId, quantity, createdAt: new Date() })
                .execute();
        } else {
            await this.cartRepository
                .createQueryBuilder()
                .update(Cart, { buyNow: true, quantity: () => 'quantity + 1' })
                .where('attribute = :attribute', { attribute: cart.attribute })
                .andWhere('cart_key = :cartKey', { cartKey: cart.cartKey })
                .andWhere('product_id = :productId', { productId: cart.productId })
                .execute();
        }

        return await this.cartProducts(cart.cartKey);
    }

    public async addQuantity(id: number, quantity: number): Promise<CartProductDto[]> {

        const checkCart = await this.cartRepository.findOne(id);

        if (checkCart === undefined) { return undefined; }

        if (quantity <= 0) {
            await this.cartRepository.delete(id);
        } else {
            await this.cartRepository.update({ id }, { quantity });
        }

        return await this.cartProducts(checkCart.cartKey);
    }

    public generateCartkey(): string {
        return Math.random().toString().substring(3);
    }

    public async buyNow(id: number): Promise<void> {
        await this.cartRepository.update({ id }, { buyNow: true, createdAt: new Date() });
        return;
    }

    public async productTotal(id: number): Promise<number | undefined> {
        return await this.cartRepository
            .createQueryBuilder('cart')
            .leftJoinAndSelect('cart.product', 'product')
            .select('ROUND(COALESCE(NULLIF(product.discounted_price, 0), product.price) * cart.quantity, 2)', 'total')
            .cache(true)
            .where('cart.id = :id', { id })
            .getRawOne();
    }

    public async buyLater(id: number): Promise<void> {
        await this.cartRepository.update({ id }, { buyNow: false, quantity: 1 });
        return;
    }

    public async cartProducts(cartKey: string, buyNow: boolean = true): Promise<CartProductDto[]> {
        const cartProducts =  await this.cartRepository
            .createQueryBuilder('cart')
            .innerJoinAndSelect('cart.product', 'product')
            .select(['product.id', 'product.name', 'product.image_1', 'cart.id', 'cart.attribute', 'cart.quantity'])
            .addSelect('ROUND(COALESCE(NULLIF(product.discounted_price, 0), product.price) * cart.quantity, 2)', 'subtotal')
            .addSelect('ROUND(COALESCE(NULLIF(product.discounted_price, 0), product.price), 2)', 'price')
            .where('cart.cart_key = :cartKey', { cartKey })
            .andWhere('cart.buy_now = :buyNow', { buyNow })
            .getRawMany();
        const result: CartProductDto[] = [];

        await Object.keys(cartProducts).forEach(key => {
            result.push({
                cartId: cartProducts[key].cart_id,
                attribute: cartProducts[key].cart_attribute,
                quantity: cartProducts[key].cart_quantity,
                productId: cartProducts[key].product_id,
                name: cartProducts[key].product_name,
                subtotal: cartProducts[key].subtotal,
                price: cartProducts[key].price,
                image: cartProducts[key].product_image_1,
            });
        });
        return result;
    }

    public async removeCart(cartKey: string): Promise<void> {
        await this.cartRepository.delete({ cartKey });
        return;
    }

    public async removeProduct(id: number): Promise<void> {
        await this.cartRepository.delete(id);
        return;
    }
}
