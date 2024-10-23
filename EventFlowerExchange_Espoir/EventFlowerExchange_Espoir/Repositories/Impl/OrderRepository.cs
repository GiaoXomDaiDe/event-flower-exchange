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
        // for order
        public async Task<string> GetLatestOrderIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var orderIds = await _context.Orders
                    .Select(u => u.OrderId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestOrderId = orderIds
                    .Select(id => new { OrderId = id, NumericPart = int.Parse(id.Substring(1)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.OrderId)
                    .Select(u => u.OrderId)
                    .FirstOrDefault();

                return latestOrderId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
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

        // for cart

    }
}
