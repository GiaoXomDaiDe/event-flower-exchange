using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface ISellerRepository
    {
        public Task<User> GetShopDetailByAccountId(string accountId);
        public Task<List<User>> GetAllUsers();
    }
}
