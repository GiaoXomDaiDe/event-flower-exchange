using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class SellerRepository : ISellerRepository
    {
        private readonly EspoirDbContext _context;

        public SellerRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetShopDetailByAccountId(string accountId)
        {
            return await _context.Users
                .FirstOrDefaultAsync(item => item.AccountId.Equals(accountId));
        }
    }
}
