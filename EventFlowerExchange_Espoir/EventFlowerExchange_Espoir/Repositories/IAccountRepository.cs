using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IAccountRepository
    {
        public Task<Account> GetAccountByEmailAsync(string email);
        public Task<Account> GetAccountById(string accountId);
        public Task<Account> GetAccountByPhoneAsync(string phone);
        public Task<User> GetUserByAccountIdAsync(string accountId);
        public Task<User> GetSellerProfileByAccountIdAsync(string accountId);
        public Task<string> GetAccountIdByShopName(string shopName);
        public Task<User> GetUserByShopName(string shopName);
        public Task<string> GetLatestAccountIdAsync();

        public Task<dynamic> CreateAccountAsync(Account acc);
        public Task<bool> UpdateAccount(Account acc);


        // for seller
        public Task<User> GetUserByAccountId(string accountId);
        public Task<dynamic> CreateUserAsync(User user);
        public Task<string> GetLatestUserIdAsync();
        public Task<dynamic> DeleteUserAsync(User user);
        public  Task<dynamic> GetBankInfoOfSellerAsync(string accountId);
        public Task<dynamic> GetListBankNameAsync();
        public Task<long> GetAccountBalance(string accountId);
    }
}
