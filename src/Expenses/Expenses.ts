import IExpenses from "./IExpenses";
import ExpenseCalculator from "./ExpenseCalculator";
import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class Expenses implements IExpenses {
  // private expensesLog: IExpenses[];
  private personsLedger: Map<IPerson, number> = new Map<IPerson, number>();
  constructor(personsMap: Map<string, IPerson>) {
    for (const [_, person] of personsMap) {
      this.personsLedger.set(person, 0);
    }
  }

  add(expense: IExpense): void {
    ExpenseCalculator.calculate(this.personsLedger, expense);
  }

  show(): void {
    console.log(this.personsLedger);
  }
}

export default Expenses;
