import IPerson from "../Person/IPerson";

interface IExpense {
  readonly name: string;
  readonly paidBy: string;
  readonly amount: number;
  readonly splitMap: Map<IPerson, number>;
  split: (
    numberOfPersons: number,
    personsMap: Map<string, IPerson>
  ) => Promise<void>;
}

export default IExpense;
