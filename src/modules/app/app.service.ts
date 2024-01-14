import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  root(): string {
    const appURL = this.configService.get('APP_URL');
    this.logger.info('Logging the APP_URL -> ' + appURL);
    return appURL;
  }
}
