import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { Department } from './department.model';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {

  constructor(private readonly departmentService: DepartmentService) { }

  @Get()
  public findDepartments(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  public findDepartment(@Param('id', new ParseIntPipe()) id: number): Promise<Department> {
    return this.departmentService.findOne(id);
  }
}
