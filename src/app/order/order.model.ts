import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Shipping } from '../shipping/shipping.model';
import { Tax } from '../tax/tax.model';
import { User } from '../user/user.model';
import { OrderDetail } from './order-detail.model';

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column({name: 'total_amount', nullable: true})
    public totalAmount: number;

    @Column({name: 'shipped_on', type: 'datetime', nullable: true})
    public shippedOn: Date;

    @Column({default: '0'})
    public status: number;

    @Column({nullable: true})
    public comments: string;

    @Column({name: 'auth_code', nullable: true})
    public authCode: string;

    @Column({nullable: true})
    public reference: string;

    @Column({name: 'user_id'})
    public userId: number;

    @Column({name: 'tax_id'})
    public taxId: number;

    @Column({name: 'shipping_id'})
    public shippingId: number;

    @CreateDateColumn({name: 'created_on', nullable: true})
    public createdAt: Date;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    public user?: User;

    @ManyToOne(() => Tax)
    @JoinColumn({ name: 'tax_id' })
    public tax?: Tax;

    @ManyToOne(() => Shipping)
    @JoinColumn({ name: 'shipping_id' })
    public shipping?: Shipping;

    @OneToMany(() => OrderDetail, detail => detail.order)
    public details?: OrderDetail[];
}
