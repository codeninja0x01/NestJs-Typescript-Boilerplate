
import { Controller, Get } from '@nestjs/common';

import { ConfigService } from './app/config/config.service';

@Controller()
export class AppController {

    constructor(private config: ConfigService) {
    }

    @Get()
    public root(): any {
        return {
            name: this.config.get('APP_NAME'),
            version: this.config.getPkg('version'),
            description: this.config.getPkg('description'),
        };
    }
}
