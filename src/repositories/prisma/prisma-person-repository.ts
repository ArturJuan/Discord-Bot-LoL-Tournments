import { PrismaService } from 'src/database/prisma.service';
import { PersonRepository } from '../person-repository';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaPersonRepository implements PersonRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    name: string,
    age: number,
    personFunction: string,
  ): Promise<void> {
    await this.prisma.person.create({
      data: {
        id: randomUUID(),
        name,
        age,
        function: personFunction,
      },
    });
  }
}
