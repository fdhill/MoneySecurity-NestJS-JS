import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaModule } from './prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  controllers: [HealthController, UserController],
  providers: [
    {
      provide: UserService,
      useFactory: (prisma) => new UserService(prisma),
      inject: ['PrismaService'],
    },
  ],
})
export class AppModule {}
