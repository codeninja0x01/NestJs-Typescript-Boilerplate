import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
    BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Order } from '../order/order.model';
import { Review } from '../product/product-review.model';
import { ShippingRegion } from '../shipping/shipping-region.model';

@Entity()
export class User {

  public static hashPassword(pwd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pwd, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 500 })
  public name: string;

  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({name: 'address_1', nullable: true})
  public address1: string;

  @Column({name: 'address_2', nullable: true})
  public address2: string;

  @Column({nullable: true})
  public city: string;

  @Column({nullable: true})
  public region: string;

  @Column({name: 'postal_code', nullable: true})
  public postalCode: string;

  @Column({nullable: true})
  public country: string;

  @Column({name: 'day_phone', nullable: true})
  public dayPhone: string;

  @Column({name: 'eve_phone', nullable: true})
  public evePhone: string;

  @Column({name: 'mob_phone', nullable: true})
  public mobPhone: string;

  @Column({name: 'credit_card', nullable: true})
  public creditCard: string;

  @Column({name: 'region_id', default: 1})
  public RegionId: number;

  @ManyToOne(() => ShippingRegion, shippingRegion => shippingRegion.users)
  @JoinColumn({ name: 'region_id' })
  public shippingRegion: ShippingRegion;

  @OneToMany(() => Order, order => order.user)
  public orders: Order[];

  @OneToMany(() => Review, reviews => reviews.user)
  public reviews: Review[];

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }
}
