import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Tax } from './tax.model';

@Injectable()
export class TaxService {

    constructor(
        @InjectRepository(Tax)
        private readonly taxRepository: Repository<Tax>
    ) { }

    public async findAll(): Promise<Tax[]> {
        return this.taxRepository.find();
    }

    public async findOne(id: number): Promise<Tax> {
        return this.taxRepository.findOne({ id });
    }
}
