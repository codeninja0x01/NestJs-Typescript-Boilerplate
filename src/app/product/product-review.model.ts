import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { User } from '../user/user.model';
import { Product } from './product.model';

@Entity()
export class Review {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public review: string;

    @Column()
    public rating: number;

    @CreateDateColumn({name: 'created_on', nullable: true})
    public createdAt: Date;

    @Column({name: 'product_id'})
    public productId: number;

    @Column({name: 'user_id'})
    public userId: number;

    @ManyToOne(() => Product, product => product.reviews)
    @JoinColumn({ name: 'product_id' })
    public product: Product;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    public user: User;

}
