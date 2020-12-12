import inquirer from 'inquirer';

import Person from './Person';
import IPerson from './IPerson';
import Expenses from './Expenses';
import IExpenses from './IExpenses';
import IExpense from './IExpense';
import ExpenseFactory from './ExpenseFactory';
import userPrompts from './userPrompts';

class Splitter {
	async start() {
		try {
			// get number of persons in group
			const userInput = await inquirer.prompt([
				userPrompts.NUMBER_OF_PERSONS
			]);

			const numberOfPersons: number = userInput.numberOfPersons;

			// get names of persons in group
			const persons: IPerson[] = [];
			for (let i = 0; i < numberOfPersons; i++) {
				const userInput = await inquirer.prompt([
					userPrompts.PERSON_NAME
				]);

				persons.push(new Person(userInput.personName));
			}		

			console.log(persons);

			const expenses: IExpenses = new Expenses();

			// get expenses
			for(;;) {
				let userInput = await inquirer.prompt([
					userPrompts.ADD_EXPENSE
				]);

				if (!userInput.addExpense) {
					break;
				}

				userInput = await inquirer.prompt([
					userPrompts.EXPENSE_NAME
				]);

				const expenseName: string = userInput.expenseName;

				userInput = await inquirer.prompt([
					userPrompts.EXPENSE_TYPE
				]);

				const expenseType: string = userInput.expenseType;

				const expense: IExpense = ExpenseFactory.createExpense(expenseName, expenseType);

				expenses.add(expense);
				console.log(userInput);
			}

			expenses.show();

		} catch (e) {
			console.log(e);
		}
	}
}

const splitter = new Splitter();
splitter.start();