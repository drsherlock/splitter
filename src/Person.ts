import IPerson from "./IPerson";

class Person implements IPerson {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export default Person;
