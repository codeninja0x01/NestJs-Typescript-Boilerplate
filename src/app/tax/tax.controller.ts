import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { Tax } from './tax.model';
import { TaxService } from './tax.service';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) { }

  @Get()
  public async getTaxs(): Promise<Tax[]> {
    return this.taxService.findAll();
  }

  @Get(':id')
  public async findTax(@Param('id', new ParseIntPipe()) id: number): Promise<Tax> {
    return this.taxService.findOne(id);
  }

}
