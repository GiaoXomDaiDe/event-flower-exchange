using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Repositories;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<Transaction> CreateTransaction(string orderId, string accountId)
        {
            return await _transactionRepository.CreateTransaction(orderId, accountId);
        }

        public async Task<List<Transaction>> GetAllTransactionByOrder(string orderId)
        {
            return await _transactionRepository.GetAllTransactionsByOrderId(orderId);
        }

        public async Task<List<Transaction>> GetAllTransactions()
        {
            return await _transactionRepository.GetAllTransactions();
        }

        public async Task<Transaction> GetTransactionById(string transactionId)
        {
            return await _transactionRepository.GetTransactionById(transactionId);
        }
    }
}
