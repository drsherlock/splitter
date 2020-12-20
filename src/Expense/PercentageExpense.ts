import inquirer from "inquirer";

import IExpense from "./IExpense";
import IPerson from "../Person/IPerson";

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
    personsMap: Map<string, IPerson>
  ): Promise<void> {
    let percentageSoFar = 0;
    for (const [personName, person] of personsMap) {
      if (this.paidBy === personName) {
        continue;
      }

      const userInput = await inquirer.prompt([
        {
          name: "personPercentage",
          type: "number",
          message: `What percentage does ${personName} has to pay?`,
        },
      ]);
      const personPercentage: number = userInput.personPercentage;

      if (!personPercentage) {
        throw new Error("Please provide valid percentage value");
      }

      percentageSoFar += personPercentage;
      if (percentageSoFar > 100) {
        throw new Error("Percentage mismatch");
      }

      this.splitMap.set(person, (-personPercentage * this.amount) / 100);
    }

    this.splitMap.set(
      personsMap.get(this.paidBy)!,
      (percentageSoFar * this.amount) / 100
    );
  }
}

export default PercentageExpense;
