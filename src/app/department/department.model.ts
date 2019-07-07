import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../category/category.model';
import { Product } from '../product/product.model';

@Entity()
export class Department {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column({type: 'text'})
    public description: string;

    @OneToMany(type => Category, categories => categories.department)
    public categories: Category[];

    public products: Product[];

}
