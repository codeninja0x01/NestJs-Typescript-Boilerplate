import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Department } from './department.model';

@Injectable()
export class DepartmentService {

    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>
    ) { }

    public findAll(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    public findOne(id: number): Promise<Department> {
        return this.departmentRepository.findOne({ id });
    }

}
