import IExpense from "./IExpense";
import IPerson from "../Person/IPerson";
import * as UserPrompts from "../UserPrompts";

class UnequalExpense implements IExpense {
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
   * This method will split the expense unequally by amount.
   *
   * @param numberOfPersons - Number of persons in the expense.
   * @param personsMap - Map of persons' name to their object.
   */
  async split(
    numberOfPersons: number,
    personsMap: Record<string, IPerson>
  ): Promise<void> {
    let amountSoFar = 0;
    for (const personName in personsMap) {
      if (this.paidBy === personName) {
        continue;
      }

      const personAmount: number = await UserPrompts.getPersonAmount(
        personName,
        amountSoFar,
        this.amount
      );

      amountSoFar += personAmount;

      this.splitMap.set(personsMap[this.paidBy], -personAmount);
    }

    this.splitMap.set(personsMap[this.paidBy], amountSoFar);
  }
}

export default UnequalExpense;
