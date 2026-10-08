import { Dependencies, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
@Dependencies(ConfigService)
export class PrismaService {
  client;

  constructor(config) {
    const connectionString = config.get('DATABASE_URL');
    
    const { PrismaClient } = require('@prisma/client');
    this.client = new PrismaClient({
      adapter: new PrismaPg({ connectionString }),
    });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }

  get user() { return this.client.user; }
  get wallet() { return this.client.wallet; }
  get category() { return this.client.category; }
  get transaction() { return this.client.transaction; }
  get budgetTemplate() { return this.client.budgetTemplate; }
  get budgetInstance() { return this.client.budgetInstance; }
  get otp() { return this.client.otp; }
  get activityLog() { return this.client.activityLog; }
  get telegram() { return this.client.telegram; }

  $queryRaw(...args) { return this.client.$queryRaw(...args); }
  $transaction(...args) { return this.client.$transaction(...args); }
}
