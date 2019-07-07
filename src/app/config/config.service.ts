import * as dotenv from 'dotenv';
import * as fs from 'fs';

import * as pkg from '../../../package.json';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor(filePath: string) {
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public getPkg(key: string): string {
        return  (pkg as any)[key];
    }
}
