import { EXPENSE_TYPES } from "./constants";

export default {
  NUMBER_OF_PERSONS: {
    name: "numberOfPersons",
    type: "number",
    message: "How many persons are in your group?",
  },
  PERSON_NAME: {
    name: "personName",
    type: "input",
    message: "Enter the name of person:",
  },
  ADD_EXPENSE: {
    name: "addExpense",
    type: "confirm",
    message: "Do you want to add new expense?",
  },
  EXPENSE_NAME: {
    name: "expenseName",
    type: "input",
    message: "Enter name of expense:",
  },
  EXPENSE_AMOUNT: {
    name: "expenseAmount",
    type: "number",
    message: "What is the amount?",
  },
  EXPENSE_TYPE: {
    name: "expenseType",
    type: "list",
    message: "Select type of expense:",
    choices: Object.values(EXPENSE_TYPES),
  },
};
