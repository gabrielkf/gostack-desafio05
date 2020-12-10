import Transaction from '../models/Transaction';

interface Input {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      switch (transaction.type) {
        case 'income':
          income += transaction.value;
          break;
        case 'outcome':
          outcome += transaction.value;
          break;
        default:
          throw Error(`Unexpected type of transaction ${transaction.type}`);
      }
    });

    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: Input): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
