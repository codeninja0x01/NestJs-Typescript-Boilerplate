import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../product/product.model';
import { Order } from './order.model';

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public attribute: string;

    @Column({name: 'product_name'})
    public productName: string;

    @Column()
    public quantity: number;

    @Column({type: 'double', name: 'unit_cost'})
    public unitCost: number;

    @Column({default: 'USD'})
    public currency: string;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'order_id'})
    public orderId: number;

    public subtotal: number;

    @ManyToOne(() => Product, product => product.orders)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(() => Order, order => order.details)
    @JoinColumn({ name: 'order_id' })
    public order: Order;

}
