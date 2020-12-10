import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

export interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome')
      throw Error(`Unexpected type of transaction ${type}`);

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total - value <= 0)
      throw Error('Insufficient funds!');

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
