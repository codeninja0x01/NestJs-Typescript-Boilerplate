import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { Product } from '../product/product.model';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({name: 'cart_key'})
    public cartKey: string;

    @Column()
    public attribute: string;

    @Column()
    public quantity: number;

    @Column({default: true, name: 'buy_now'})
    public buyNow: boolean;

    @CreateDateColumn({name: 'created_on', nullable: true})
    public createdAt: Date;

    @Column({name: 'product_id'})
    public productId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    public product: Product;
}
