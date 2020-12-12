interface IExpense {
  name: string;
  split: () => Array<number>;
}

export default IExpense;
