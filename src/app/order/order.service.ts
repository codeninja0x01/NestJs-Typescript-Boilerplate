import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cart } from '../cart/cart.model';
import { Shipping } from '../shipping/shipping.model';
import { Tax } from '../tax/tax.model';
import { OrderCrateDto } from './dto/order-create.dto';
import { OrderDetail } from './order-detail.model';
import { Order } from './order.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Tax)
        private readonly taxRepository: Repository<Tax>,
        @InjectRepository(Shipping)
        private readonly shippingRepository: Repository<Shipping>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>
    ) {}

    public async addOrder(order: OrderCrateDto, userId: number): Promise<Order> {

        const newOrder = await this.orderRepository.save({
            userId,
            taxId: order.taxId,
            shippingId: order.shippingId,
        });

        const carts = await this.cartRepository
            .createQueryBuilder('cart')
            .select('cart.id')
            .addSelect('cart.attribute')
            .addSelect('cart.quantity')
            .addSelect('COALESCE(NULLIF(product.discounted_price, 0), product.price) * cart.quantity', 'subtotal')
            .addSelect('COALESCE(NULLIF(product.discounted_price, 0), product.price)', 'price')
            .leftJoinAndSelect('cart.product', 'product')
            .cache(true)
            .where('cart.cart_key = :id', {id: order.cartKey})
            .getRawMany();

        const preload = [];
        const orderId = [];
        let totalPrice = 0;

        await Object.keys(carts).forEach(async key => {
            totalPrice += carts[key].subtotal;
            await orderId.push(carts[key].cart_id);
            const detail = new OrderDetail();
            detail.productId = carts[key].product_id;
            detail.productName = carts[key].product_name;
            detail.quantity = carts[key].cart_quantity;
            detail.attribute = carts[key].cart_attribute;
            detail.unitCost = carts[key].price;
            detail.orderId = newOrder.id;
            await preload.push(detail);
        });

        if (preload.length > 0) {
            const taxValue = await this.taxRepository.findOne(order.taxId, {select: ['percentage']});
            const shippingValue = await this.shippingRepository.findOne(order.shippingId, {select: ['cost']});
            const taxableValue = await (taxValue.percentage * totalPrice) / 100;

            newOrder.totalAmount = await Math.round((totalPrice + shippingValue.cost + taxableValue) * 100);
            await this.orderDetailRepository.insert(preload);
            await this.orderRepository.save(newOrder);
            await this.cartRepository.delete(orderId);
        }

        return newOrder;
    }

    public findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne(
            { id },
            { select: ['id', 'shippedOn', 'status', 'totalAmount', 'createdAt'] }
        );
    }

    public orderDetail(id: number): Promise<OrderDetail[]> {
        return this.orderDetailRepository
            .createQueryBuilder()
            .select('ANY_VALUE(order_id)', 'orderId')
            .addSelect('ANY_VALUE(product_id)', 'productId')
            .addSelect('ANY_VALUE(attribute)', 'attribute')
            .addSelect('ANY_VALUE(product_name)', 'productName')
            .addSelect('ANY_VALUE(quantity)', 'quantity')
            .addSelect('ANY_VALUE(unit_cost)', 'unitCost')
            .addSelect('SUM(quantity * unit_cost)', 'subtotal')
            .where('order_id = :id', { id })
            .getRawMany();
    }

    public async currentOrder(userId: number): Promise<Order[]> {
        return await this.orderRepository
            .find({where: {userId}, select: ['id', 'totalAmount', 'createdAt', 'shippedOn', 'status'] });
    }
}
