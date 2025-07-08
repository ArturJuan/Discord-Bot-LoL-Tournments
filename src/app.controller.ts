import { Controller, Post, Body } from '@nestjs/common';
import { CreatePersonBody } from './dtos/create-person-body';
import { PersonRepository } from './repositories/person-repository';

@Controller()
export class AppController {
  constructor(private personRepository: PersonRepository) {}

  @Post()
  async getPerson(@Body() body: CreatePersonBody) {
    const { name, age, function: personFunction } = body;

    await this.personRepository.create(name, age, personFunction);
  }
}
