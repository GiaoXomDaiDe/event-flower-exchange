using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class OrderRepository : IOrderRepository
    {
        private readonly EspoirDbContext _context;

        public OrderRepository(EspoirDbContext context)
        {
            _context = context;
        }

        public async Task<Order> GetOrderByAccountId(string accountId)
        {
            return await _context.Orders.FirstOrDefaultAsync(o => o.AccountId == accountId);
        }

        public async Task<dynamic> CreateOrder(Order order)
        {
            try
            {
                await _context.Orders.AddAsync(order);
                return await _context.SaveChangesAsync();
            } catch (Exception ex)
            {
                throw new Exception($"Error at OrderRepository: {ex.Message}");
            }
        }

        public async Task<dynamic> UpdateOrder(Order order)
        {
            try
            {
                _context.Orders.Update(order);
                return await _context.SaveChangesAsync();
            } catch(Exception ex)
            {
                throw new Exception($"Error at OrderRepository: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteOrder(Order order)
        {
            _context.Orders.Remove(order);
            return await _context.SaveChangesAsync();
        }
    }
}
