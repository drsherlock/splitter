import IExpenses from "./IExpenses";
import ExpenseCalculator from "./ExpenseCalculator";
import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class Expenses implements IExpenses {
  // private expensesLog: IExpenses[];
  constructor(persons: Map<string, IPerson>) {}

  add(expense: IExpense): void {
    ExpenseCalculator.calculate(expense);
  }

  show(): void {
    console.log("expenses");
  }
}

export default Expenses;
