import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  getHello(): string {
    return 'App is running';
  }

  root(): string {
    const db = this.configService.get('DATABASE_URL');
    this.logger.info('Connecting to mongo DB -> ' + db);
    return db;
  }
}
