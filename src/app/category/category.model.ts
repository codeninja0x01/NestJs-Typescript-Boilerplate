import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Department } from '../department/department.model';
import { Product } from '../product/product.model';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column({type: 'text'})
    public description: string;

    @Column({name: 'department_id'})
    public departmentId: number;

    @ManyToMany(() => Product, product => product.categories)
    public products: Product[];

    @ManyToOne(() => Department, department => department.categories)
    @JoinColumn({ name: 'department_id' })
    public department: Department;
}
