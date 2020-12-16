import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class ExpenseCalculator {
  static calculate(personsLedger: Map<IPerson, number>, expense: IExpense): void {
    for (const [person, amount] of personsLedger) {
      personsLedger.set(person, expense.splitMap.get(person)! + amount);
    }
  }

  static evaluate(personsLedger: Map<IPerson, number>): Array<Object> {
  	//
  	return [{}];
  }
}

export default ExpenseCalculator;
