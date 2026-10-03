import { Dependencies, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
// ponytail: ekstensi .ts wajib ditulis karena Prisma 7 hasilkan client TypeScript.
// Bisa jalan karena Node >= 22 (type stripping). Kalau pindah ke Jest/TS runner, samakan.
import { PrismaClient } from '../generated/prisma/client.ts';

@Injectable()
@Dependencies(ConfigService)
export class PrismaService extends PrismaClient {
  constructor(config) {
    super({
      adapter: new PrismaPg({ connectionString: config.get('DATABASE_URL') }),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
