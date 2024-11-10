using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface ITransactionRepository
    {
        public Task<string> AutoGenerateTransactionId();
        public Task<string> GetLatestTransactionAsync();
        public Task<List<Transaction>> GetAllTransactions();
        public Task<List<Transaction>> GetAllTransactionsByOrderId(string orderId);
        public Task<Transaction> CreateTransaction(string orderId, string accountId);
        public Task<Transaction> GetTransactionById(string transactionId);
        public Task UpdateTransaction(Transaction transaction);
    }
}
