import { Args, Query, Resolver } from '@nestjs/graphql';

import { Department } from '../department.model';
import { DepartmentService } from '../department.service';

@Resolver()
export class DepartmentResolver {

    constructor(
        private readonly departmentService: DepartmentService
    ) { }

    @Query()
    public getDepartments(): Promise<Department[]> {
        return this.departmentService.findAll();
    }

    @Query()
    public getDepartment(@Args('id') id: number): Promise<Department> {
        return this.departmentService.findOne(id);
    }
}
