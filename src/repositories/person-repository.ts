export abstract class PersonRepository {
  abstract create(
    name: string,
    age: number,
    personFunction: string,
  ): Promise<void>;
}
