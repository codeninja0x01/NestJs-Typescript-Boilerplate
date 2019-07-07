import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../product/product.model';
import { Attribute } from './attribute.model';

@Entity()
export class AttributeValue {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column({name: 'attribute_id'})
    public attributeId: number;

    @ManyToOne(() => Attribute, attribute => attribute.values)
    @JoinColumn({ name: 'attribute_id' })
    public attribute: Attribute;

    @ManyToMany(() => Product, product => product.attributes)
    public products: Product[];

}
