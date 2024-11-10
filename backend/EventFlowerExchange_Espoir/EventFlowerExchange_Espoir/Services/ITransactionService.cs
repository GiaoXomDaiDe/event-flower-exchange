using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Services
{
    public interface ITransactionService
    {
        public Task<List<Transaction>> GetAllTransactions();
        public Task<List<Transaction>> GetAllTransactionByOrder(string orderId);
        public Task<Transaction> GetTransactionById(string transactionId);
        public Task<Transaction> CreateTransaction(string orderId, string accountId);
    }
}
