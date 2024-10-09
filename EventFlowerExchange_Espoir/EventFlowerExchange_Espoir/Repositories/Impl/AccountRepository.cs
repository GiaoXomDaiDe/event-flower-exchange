using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Google;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class AccountRepository : IAccountRepository
    {
        private readonly EspoirDbContext _context;

        public AccountRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<Account> GetAccountByEmailAsync(string email)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.Email == email);
        }

        public async Task<Account> GetAccountById(string accountId)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId);  
        }
        public async Task<Account> GetAccountByPhoneAsync(string phone)
        {
            return await _context.Accounts.FirstOrDefaultAsync(a => a.PhoneNumber == phone);
        }
        public async Task<string> GetLatestAccountIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var accountIds = await _context.Accounts
                    .Select(u => u.AccountId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestAccountId = accountIds
                    .Select(id => new { AccountId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.AccountId)
                    .Select(u => u.AccountId)
                    .FirstOrDefault();

                return latestAccountId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public async Task<dynamic> CreateAccountAsync(Account acc)
        {
            try
            {
                using (var context = new EspoirDbContext())
                {
                    await context.Accounts.AddAsync(acc);
                    return await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<bool> UpdateAccount(Account acc)
        {
            _context.Accounts.Update(acc);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
