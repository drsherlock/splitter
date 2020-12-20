import IPerson from "./Person/IPerson";
import Expenses from "./Expenses/Expenses";
import IExpenses from "./Expenses/IExpenses";
import IExpense from "./Expense/IExpense";
import ExpenseFactory from "./Expense/ExpenseFactory";
import * as UserPrompts from "./UserPrompts";

class Splitter {
  async start() {
    try {
      const numberOfPersons: number = await UserPrompts.getNumberOfPersons();

      const personsMap: Record<
        string,
        IPerson
      > = await UserPrompts.getNamesOfPersons(numberOfPersons);

      const expenses: IExpenses = new Expenses(personsMap);

      // get expenses
      for (;;) {
        const addExpense = await UserPrompts.getAddExpense();

        if (!addExpense) {
          break;
        }

        const expenseName: string = await UserPrompts.getExpenseName();

        const paidBy: string = await UserPrompts.getPaidBy(personsMap);

        const expenseAmount: number = await UserPrompts.getExpenseAmount();

        const expenseType: string = await UserPrompts.getExpenseType();

        const expense: IExpense = ExpenseFactory.createExpense(
          expenseName,
          paidBy,
          expenseAmount,
          expenseType
        );

        await expense.split(numberOfPersons, personsMap);

        expenses.add(expense);
      }

      expenses.show();
    } catch (e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

const splitter = new Splitter();
splitter.start();
