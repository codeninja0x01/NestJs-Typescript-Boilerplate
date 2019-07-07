import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tax {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public type: string;

    @Column({type: 'double'})
    public percentage: number;

}
