import IExpense from './IExpense';

class PercentageExpense implements IExpense {
	public name: string;
	constructor(name: string) {
		this.name = name;
	}

	split(): Array<number> {
		return [];
	}
}

export default PercentageExpense;


