import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AttributeValue } from './attribute-value.model';

@Entity()
export class Attribute {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @OneToMany(() => AttributeValue, value => value.attribute)
    public values?: AttributeValue[];

}
