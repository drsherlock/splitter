import IExpense from "./IExpense";
import IPerson from "../Person/IPerson";
import * as UserPrompts from "../UserPrompts";

class PercentageExpense implements IExpense {
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
   * This method will split the expense by percentage.
   *
   * @param numberOfPersons - Number of persons in the expense.
   * @param personsMap - Map of persons' name to their object.
   */
  async split(
    numberOfPersons: number,
    personsMap: Record<string, IPerson>
  ): Promise<void> {
    let percentageSoFar = 0;
    for (const personName in personsMap) {
      if (this.paidBy === personName) {
        continue;
      }

      const personPercentage: number = await UserPrompts.getPersonPercentage(
        personName,
        percentageSoFar
      );

      percentageSoFar += personPercentage;

      this.splitMap.set(
        personsMap[personName],
        (-personPercentage * this.amount) / 100
      );
    }

    this.splitMap.set(
      personsMap[this.paidBy],
      (percentageSoFar * this.amount) / 100
    );
  }
}

export default PercentageExpense;
