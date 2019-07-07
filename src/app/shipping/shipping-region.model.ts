import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.model';
import { Shipping } from './shipping.model';

@Entity()
export class ShippingRegion {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    @IsNotEmpty()
    public title: string;

    @OneToMany(() => Shipping, shipping => shipping.shippingRegion)
    public shippings: Shipping[];

    @OneToMany(() => User, user => user.shippingRegion)
    public users: User[];

}
