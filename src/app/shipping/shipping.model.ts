import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ShippingRegion } from './shipping-region.model';

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public type: string;

    @Column({type: 'double', default: '0.00'})
    public cost: number;

    @Column({name: 'shipping_region_id'})
    public shippingRegionId: number;

    @ManyToOne(() => ShippingRegion, shippingRegion => shippingRegion.shippings)
    @JoinColumn({ name: 'shipping_region_id' })
    public shippingRegion: ShippingRegion;

}
