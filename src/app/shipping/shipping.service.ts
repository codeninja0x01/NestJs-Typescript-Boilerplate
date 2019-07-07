import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Shipping } from './shipping.model';

@Injectable()
export class ShippingService {

    constructor(
        @InjectRepository(Shipping)
        private readonly shippingRepository: Repository<Shipping>
    ) { }

    public findAll(): Promise<Shipping[]> {
        return this.shippingRepository.find();
    }

    public region(id: number): Promise<Shipping> {
        return this.shippingRepository.findOne({ where: {shippingRegionId: {id}} });
    }
}
