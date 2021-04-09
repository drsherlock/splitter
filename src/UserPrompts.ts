import inquirer from "inquirer";

import Person from "./Person/Person";
import IPerson from "./Person/IPerson";
import { EXPENSE_TYPES } from "./constants";

const prompts = {
  NUMBER_OF_PERSONS: {
    name: `numberOfPersons`,
    type: `number`,
    message: `How many persons are in your group?`,
  },
  PERSON_NAME: {
    name: `personName`,
    type: `input`,
    message: `Enter the name of person:`,
  },
  ADD_EXPENSE: {
    name: `addExpense`,
    type: `confirm`,
    message: `Do you want to add new expense?`,
  },
  EXPENSE_NAME: {
    name: `expenseName`,
    type: `input`,
    message: `Enter name of expense:`,
  },
  EXPENSE_AMOUNT: {
    name: `expenseAmount`,
    type: `number`,
    message: `What is the amount?`,
  },
  EXPENSE_TYPE: {
    name: `expenseType`,
    type: `list`,
    message: `Select type of expense:`,
    choices: Object.values(EXPENSE_TYPES),
  },
};

export const getNumberOfPersons = async (): Promise<number> => {
  // get number of persons in group
  try {
    const userInput = await inquirer.prompt([prompts.NUMBER_OF_PERSONS]);
    const numberOfPersons: number = userInput.numberOfPersons;

    if (!numberOfPersons) {
      throw new Error(`Please provide number of persons`);
    }

    return numberOfPersons;
  } catch (e) {
    console.log(e.message);
    return getNumberOfPersons();
  }
};

export const getNamesOfPersons = async (
  numberOfPersons: number
): Promise<Record<string, IPerson>> => {
  // get names of persons in group
  try {
    const personsMap: Record<string, IPerson> = {};

    for (let i = 0; i < numberOfPersons; i++) {
      const userInput = await inquirer.prompt([
        {
          name: `personName`,
          type: `input`,
          message: `Enter the name of person ${i + 1}:`,
        },
      ]);
      const personName: string = userInput.personName;

      if (!personName) {
        throw new Error(`Please provide a person name`);
      }

      if (personName in personsMap) {
        throw new Error(`Please provide unique names`);
      }

      personsMap[personName] = new Person(userInput.personName);
    }

    return personsMap;
  } catch (e) {
    console.log(e.message);
    return getNamesOfPersons(numberOfPersons);
  }
};

export const getAddExpense = async (): Promise<boolean> => {
  const userInput = await inquirer.prompt([prompts.ADD_EXPENSE]);

  return userInput.addExpense;
};

export const getExpenseName = async (): Promise<string> => {
  try {
    const userInput = await inquirer.prompt([prompts.EXPENSE_NAME]);
    const expenseName: string = userInput.expenseName;

    if (!expenseName) {
      throw new Error(`Please provide valid expense name`);
    }

    return expenseName;
  } catch (e) {
    console.log(e.message);
    return getExpenseName();
  }
};

export const getPaidBy = async (
  personsMap: Record<string, IPerson>
): Promise<string> => {
  const userInput = await inquirer.prompt([
    {
      name: `paidBy`,
      type: `list`,
      message: `Who paid for this?`,
      choices: Object.keys(personsMap),
    },
  ]);
  const paidBy: string = userInput.paidBy;

  return paidBy;
};

export const getExpenseAmount = async (): Promise<number> => {
  try {
    const userInput = await inquirer.prompt([prompts.EXPENSE_AMOUNT]);
    const expenseAmount: number = userInput.expenseAmount;

    if (!expenseAmount) {
      throw new Error(`Please provide valid expense amount`);
    }

    return expenseAmount;
  } catch (e) {
    console.log(e.message);
    return getExpenseAmount();
  }
};

export const getExpenseType = async (): Promise<string> => {
  const userInput = await inquirer.prompt([prompts.EXPENSE_TYPE]);
  const expenseType: string = userInput.expenseType;

  return expenseType;
};

export const getPersonPercentage = async (
  personName: string,
  percentageSoFar: number
): Promise<number> => {
  try {
    const userInput = await inquirer.prompt([
      {
        name: `personPercentage`,
        type: `number`,
        message: `What percentage does ${personName} has to pay?`,
      },
    ]);
    const personPercentage: number = userInput.personPercentage;

    if (!personPercentage) {
      throw new Error(`Please provide valid percentage value`);
    }

    if (percentageSoFar + personPercentage > 100) {
      throw new Error(`Percentage mismatch`);
    }

    return personPercentage;
  } catch (e) {
    console.log(e.message);
    return getPersonPercentage(personName, percentageSoFar);
  }
};

export const getPersonAmount = async (
  personName: string,
  amountSoFar: number,
  amount: number
): Promise<number> => {
  try {
    const userInput = await inquirer.prompt([
      {
        name: `personAmount`,
        type: `number`,
        message: `How much does ${personName} has to pay?`,
      },
    ]);
    const personAmount: number = userInput.personAmount;

    if (!personAmount) {
      throw new Error(`Please provide valid amount value`);
    }

    if (amountSoFar + personAmount > amount) {
      throw new Error(`Amount mismatch`);
    }

    return personAmount;
  } catch (e) {
    console.log(e.message);
    return getPersonAmount(personName, amountSoFar, amount);
  }
};
