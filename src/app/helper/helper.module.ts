
import { Global, HttpModule, Module } from '@nestjs/common';

import { EmailService } from './helper.service.email';

const services = [EmailService];

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class HelperModule {}
