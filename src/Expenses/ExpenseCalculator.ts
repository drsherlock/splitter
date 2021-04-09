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

    let leftIdx = 0;
    let rightIdx = ledgerArraySorted.length - 1;

    while (leftIdx < rightIdx) {
      // [{a, -5}, {b, 5}]
      if (
        ledgerArraySorted[leftIdx].amount ===
        -ledgerArraySorted[rightIdx].amount
      ) {
        evaluatedLedger.push(
          `${ledgerArraySorted[rightIdx].person.name} gets back ${ledgerArraySorted[rightIdx].amount} from ${ledgerArraySorted[leftIdx].person.name}`
        );

        ledgerArraySorted[leftIdx].amount = 0;
        ledgerArraySorted[rightIdx].amount = 0;

        leftIdx += 1;
        rightIdx -= 1;
      }
      // [{a, -5}, {b, 3}]
      else if (
        ledgerArraySorted[leftIdx].amount < -ledgerArraySorted[rightIdx].amount
      ) {
        evaluatedLedger.push(
          `${ledgerArraySorted[rightIdx].person.name} gets back ${ledgerArraySorted[rightIdx].amount} from ${ledgerArraySorted[leftIdx].person.name}`
        );

        ledgerArraySorted[leftIdx].amount =
          ledgerArraySorted[leftIdx].amount +
          ledgerArraySorted[rightIdx].amount;
        ledgerArraySorted[rightIdx].amount = 0;

        rightIdx -= 1;
      }
      // [{a, -3}, {b, 5}]
      else if (
        ledgerArraySorted[leftIdx].amount > -ledgerArraySorted[rightIdx].amount
      ) {
        evaluatedLedger.push(
          `${
            ledgerArraySorted[rightIdx].person.name
          } gets back ${-ledgerArraySorted[leftIdx].amount} from ${
            ledgerArraySorted[leftIdx].person.name
          }`
        );

        ledgerArraySorted[rightIdx].amount =
          ledgerArraySorted[leftIdx].amount +
          ledgerArraySorted[rightIdx].amount;
        ledgerArraySorted[leftIdx].amount = 0;

        leftIdx += 1;
      }
    }

    return evaluatedLedger;
  }
}

export default ExpenseCalculator;
