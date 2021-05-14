import IExpenses from "./IExpenses";
import ExpenseCalculator from "./ExpenseCalculator";
import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class Expenses implements IExpenses {
  // private expensesLog: IExpenses[];
  private ledger: Map<IPerson, number> = new Map<IPerson, number>();
  constructor(personsMap: Record<string, IPerson>) {
    for (const personName in personsMap) {
      this.ledger.set(personsMap[personName], 0);
    }
  }

  add(expense: IExpense): void {
    ExpenseCalculator.calculate(this.ledger, expense);
  }

  show(): void {
    const evaluatedLedger: Array<string> = ExpenseCalculator.evaluate(
      this.ledger
    );

    console.log(`Balances---`);
    for (const l of evaluatedLedger) {
      console.log(l);
    }
  }
}

export default Expenses;
