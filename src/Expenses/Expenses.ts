import IExpenses from "./IExpenses";
import ExpenseCalculator from "./ExpenseCalculator";
import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class Expenses implements IExpenses {
  // private expensesLog: IExpenses[];
  private ledger: Map<IPerson, number> = new Map<IPerson, number>();
  constructor(personsMap: Map<string, IPerson>) {
    for (const [_, person] of personsMap) {
      this.ledger.set(person, 0);
    }
  }

  add(expense: IExpense): void {
    ExpenseCalculator.calculate(this.ledger, expense);
  }

  show(): void {
    const evaluatedLedger: Array<string> = ExpenseCalculator.evaluate(this.ledger);

    for(let i = 0; i < evaluatedLedger.length; i++) {
      console.log(evaluatedLedger[i]);
    }
  }
}

export default Expenses;
