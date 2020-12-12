import IExpenses from './IExpenses';
import ExpenseCalculator from './ExpenseCalculator';
import IExpense from './IExpense';

class Expenses implements IExpenses {
	constructor() {
		
	}

	add(expense: IExpense): void {
		ExpenseCalculator.calculate(expense);
	}

	show(): void {
		console.log("expenses");
	}
}

export default Expenses;