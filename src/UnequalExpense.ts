import inquirer from "inquirer";

import IExpense from "./IExpense";
import IPerson from "./IPerson";

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
    personsMap: Map<string, IPerson>
  ): Promise<void> {
    let amountSoFar = 0;
    for (const [personName, person] of personsMap) {
      if (this.paidBy === personName) {
        continue;
      }

      const userInput = await inquirer.prompt([
        {
          name: "personAmount",
          type: "number",
          message: `How much does ${personName} has to pay?`,
        },
      ]);
      const personAmount: number = userInput.personAmount;

      amountSoFar += personAmount;
      if (amountSoFar > this.amount) {
        throw new Error("Amount mismatch");
      }

      this.splitMap.set(person, -personAmount);
    }

    this.splitMap.set(personsMap.get(this.paidBy)!, this.amount - amountSoFar);
  }
}

export default UnequalExpense;
