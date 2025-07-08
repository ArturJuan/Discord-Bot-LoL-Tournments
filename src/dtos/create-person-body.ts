import { IsNotEmpty, Length } from 'class-validator';

export class CreatePersonBody {
  @IsNotEmpty({
    message: 'The person name should not be empty.',
  })
  @Length(5, 100)
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  function: string;
}
