import IExpense from "./IExpense";
import IPerson from "../Person/IPerson";

class EqualExpense implements IExpense {
  public readonly name: string;
  public readonly paidBy: string;
  public readonly amount: number;
  public readonly splitMap: Map<IPerson, number>;
  constructor(name: string, paidBy: string, amount: number) {
    this.name = name;
    this.paidBy = paidBy;
    this.amount = amount;
    this.splitMap = new Map<IPerson, number>();
  }

  /**
   * This method will split the expense equally.
   *
   * @param numberOfPersons - Number of persons in the expense.
   * @param personsMap - Map of persons' name to their object.
   */
  async split(
    numberOfPersons: number,
    personsMap: Map<string, IPerson>
  ): Promise<void> {
    const split: number =
      Math.round((this.amount / numberOfPersons) * 100) / 100;

    for (const [personName, person] of personsMap) {
      if (this.paidBy === personName) {
        continue;
      }

      this.splitMap.set(person, -split);
    }

    this.splitMap.set(
      personsMap.get(this.paidBy)!,
      split * (numberOfPersons - 1)
    );
  }
}

export default EqualExpense;
