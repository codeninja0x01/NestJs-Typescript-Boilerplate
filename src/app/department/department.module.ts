import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartmentController } from './department.controller';
import { Department } from './department.model';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './graphql/department.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentResolver],
})
export class DepartmentModule {}
