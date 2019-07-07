import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaxController } from './tax.controller';
import { Tax } from './tax.model';
import { TaxService } from './tax.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tax])],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
