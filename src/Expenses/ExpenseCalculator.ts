import IExpense from "../Expense/IExpense";
import IPerson from "../Person/IPerson";

class ExpenseCalculator {
  static calculate(ledger: Map<IPerson, number>, expense: IExpense): void {
    for (const [person, amount] of ledger) {
      ledger.set(person, expense.splitMap.get(person)! + amount);
    }
  }

  static evaluate(ledger: Map<IPerson, number>): Array<string> {
    const evaluatedLedger: Array<string> = [];
    const ledgerArray = Array.from(ledger, ([person, amount]) => ({
      person,
      amount,
    }));
    const ledgerArraySorted = ledgerArray.sort((a, b) => a.amount - b.amount);

    let left_idx = 0;
    let right_idx = ledgerArraySorted.length - 1;

    while (left_idx < right_idx) {
      // [{a, -5}, {b, 5}]
      if (
        ledgerArraySorted[left_idx].amount ===
        -ledgerArraySorted[right_idx].amount
      ) {
        evaluatedLedger.push(
          `${ledgerArraySorted[right_idx].person.name} gets back ${ledgerArraySorted[right_idx].amount} from ${ledgerArraySorted[left_idx].person.name}`
        );

        ledgerArraySorted[left_idx].amount = 0;
        ledgerArraySorted[right_idx].amount = 0;

        left_idx += 1;
        right_idx -= 1;
      }
      // [{a, -5}, {b, 3}]
      else if (
        ledgerArraySorted[left_idx].amount <
        -ledgerArraySorted[right_idx].amount
      ) {
        evaluatedLedger.push(
          `${ledgerArraySorted[right_idx].person.name} gets back ${ledgerArraySorted[right_idx].amount} from ${ledgerArraySorted[left_idx].person.name}`
        );

        ledgerArraySorted[left_idx].amount =
          ledgerArraySorted[left_idx].amount +
          ledgerArraySorted[right_idx].amount;
        ledgerArraySorted[right_idx].amount = 0;

        right_idx -= 1;
      }
      // [{a, -3}, {b, 5}]
      else if (
        ledgerArraySorted[left_idx].amount >
        -ledgerArraySorted[right_idx].amount
      ) {
        evaluatedLedger.push(
          `${
            ledgerArraySorted[right_idx].person.name
          } gets back ${-ledgerArraySorted[left_idx].amount} from ${
            ledgerArraySorted[left_idx].person.name
          }`
        );

        ledgerArraySorted[right_idx].amount =
          ledgerArraySorted[left_idx].amount +
          ledgerArraySorted[right_idx].amount;
        ledgerArraySorted[left_idx].amount = 0;

        left_idx += 1;
      }
    }

    return evaluatedLedger;
  }
}

export default ExpenseCalculator;
