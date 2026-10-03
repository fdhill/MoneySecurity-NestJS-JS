import { ok } from './common/response';
import { Controller, Dependencies, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
@Dependencies(PrismaService)
export class HealthController {
  constructor(prisma) {
    this.prisma = prisma;
  }

  @Get()
  async check() {
    await this.prisma.$queryRaw`SELECT 1`;
    return ok('Server is healthy', { database: 'up' });
  }
}
