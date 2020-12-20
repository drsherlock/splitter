import EqualExpense from "./EqualExpense";
import UnequalExpense from "./UnequalExpense";
import PercentageExpense from "./PercentageExpense";
import IExpense from "./IExpense";

class ExpenseFactory {
  static createExpense(
    expenseName: string,
    paidBy: string,
    expenseAmount: number,
    expenseType: string
  ): IExpense {
    switch (expenseType) {
      case `Equal`:
        return new EqualExpense(expenseName, paidBy, expenseAmount);
        break;
      case `Unequal`:
        return new UnequalExpense(expenseName, paidBy, expenseAmount);
        break;
      case `Percentage`:
        return new PercentageExpense(expenseName, paidBy, expenseAmount);
        break;
      default:
        throw new Error(`Please select the type of expense`);
    }
  }
}

export default ExpenseFactory;
