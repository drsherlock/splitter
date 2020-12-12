import EqualExpense from './EqualExpense';
import UnequalExpense from './UnequalExpense';
import PercentageExpense from './PercentageExpense';
import IExpense from './IExpense';

class ExpenseFactory {
	static createExpense(expenseName: string, expenseType: string): IExpense {
		switch(expenseType) {
			case 'Equal':
				return new EqualExpense(expenseName);
				break;
			case 'Unequal':
				return new UnequalExpense(expenseName);
				break;
			case 'Percentage':
				return new PercentageExpense(expenseName);
				break;
			default:
				throw new Error('Please select the type of expense');

		}
	}
}

export default ExpenseFactory;