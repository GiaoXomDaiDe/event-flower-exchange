using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly EspoirDbContext _context;

        public TransactionRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<string> AutoGenerateTransactionId()
        {
            string newTransactionId = "";
            string latestTransactionId = await GetLatestTransactionAsync();
            if (string.IsNullOrEmpty(latestTransactionId))
            {
                newTransactionId = "TR00000001";
            }
            else
            {
                int numericpart = int.Parse(latestTransactionId.Substring(2));
                int newnumericpart = numericpart + 1;
                newTransactionId = $"TR{newnumericpart:d8}";
            }
            return newTransactionId;
        }

        public async Task<Transaction> CreateTransaction(string orderId, string accountId)
        {
            Transaction transaction = new Transaction()
            {
                TransactionId = await AutoGenerateTransactionId(),
                OrderId = orderId,
                AccountId = accountId,
                Detail = "",
                Status = 0,
                Date = DateOnly.FromDateTime(DateTime.Now)
            };
            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

        public async Task<List<Transaction>> GetAllTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task<List<Transaction>> GetAllTransactionsByOrderId(string orderId)
        {
            return await _context.Transactions
                .Where(transaction => transaction.OrderId.Equals(orderId))
                .ToListAsync();
        }

        public async Task<string> GetLatestTransactionAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var transactionIds = await _context.Transactions
                    .Select(u => u.TransactionId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var lastestTransactionId = transactionIds
                    .Select(id => new { TransactionId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.TransactionId)
                    .Select(u => u.TransactionId)
                    .FirstOrDefault();

                return lastestTransactionId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public async Task<Transaction> GetTransactionById(string transactionId)
        {
            return await _context.Transactions
                .FirstOrDefaultAsync(transaction => transaction.TransactionId.Equals(transactionId));
        }

        public async Task UpdateTransaction(Transaction transaction)
        {
            _context.Attach(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

    }
}
