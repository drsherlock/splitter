import IExpense from "./IExpense";

interface IExpenses {
  add: (expense: IExpense) => void;
  show: () => void;
}

export default IExpenses;
