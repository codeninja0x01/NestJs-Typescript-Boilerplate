import {
    Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { AttributeValue } from '../attribute/attribute-value.model';
import { Cart } from '../cart/cart.model';
import { Category } from '../category/category.model';
import { OrderDetail } from '../order/order-detail.model';
import { Review } from './product-review.model';

@Entity()
@Index(['name', 'description'], {fulltext: true})
export class Product {

    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column()
    @Column({type: 'text'})
    public description: string;

    @Column({type: 'double'})
    public price: number;

    @Column({type: 'double', default: '0.00', name: 'discounted_price'})
    public discountedPrice: number;

    @Column({name: 'image_1', nullable: true})
    public image1: string;

    @Column({name: 'image_2', nullable: true})
    public image2: string;

    @Column({nullable: true})
    public thumbnail: string;

    @Column({default: '1'})
    public display: boolean;

    @OneToMany(() => Review, reviews => reviews.product)
    public reviews: Review[];

    @OneToMany(type => OrderDetail, orders => orders.product)
    public orders: OrderDetail[];

    @OneToMany(() => Cart, carts => carts.product)
    public carts: Cart[];

    @ManyToMany(() => Category, categories => categories.products)
    @JoinTable({name: 'product_categories', joinColumns: [{name: 'product_id'}], inverseJoinColumns: [{name: 'category_id'}]})
    public categories: Category[];

    @ManyToMany(() => AttributeValue, attributes => attributes.products)
    @JoinTable({name: 'product_attributes', joinColumns: [{name: 'product_id'}], inverseJoinColumns: [{name: 'attribute_value_id'}]})
    public attributes: AttributeValue[];

}
