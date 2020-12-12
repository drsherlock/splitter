import IPerson from "./IPerson";

class Person implements IPerson {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export default Person;
