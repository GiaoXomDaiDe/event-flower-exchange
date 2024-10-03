using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> GetAccountByEmailAsync(string email);
        public Task<Account> GetAccountByPhoneAsync(string phone);

        public Task<string> GetLatestAccountIdAsync();

        public Task<dynamic> CreateAccountAsync(Account acc);
    }
}
