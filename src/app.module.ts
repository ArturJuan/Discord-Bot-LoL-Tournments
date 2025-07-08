import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { PersonRepository } from './repositories/person-repository';
import { PrismaPersonRepository } from './repositories/prisma/prisma-person-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    PrismaService,
    {
      provide: PersonRepository,
      useClass: PrismaPersonRepository,
    },
  ],
})
export class AppModule {}
