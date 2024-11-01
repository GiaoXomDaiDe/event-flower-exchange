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
        public async Task<Order> CreateOrder(Order order)
        {
            try
            {
                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();
                return order;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at OrderRepository: {ex.InnerException}");
            }
        }

        public async Task<dynamic> UpdateOrder(Order order)
        {
            try
            {
                _context.Orders.Update(order);
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at OrderRepository: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteOrder(Order order)
        {
            _context.Orders.Remove(order);
            return await _context.SaveChangesAsync();
        }

        public async Task<string> AutoGenerateOrderId()
        {
            string newOrderId = "";
            string latestOrderId = await GetLatestOrderIdAsync();
            if (string.IsNullOrEmpty(latestOrderId))
            {
                newOrderId = "O000000001";
            }
            else
            {
                int numericpart = int.Parse(latestOrderId.Substring(1));
                int newnumericpart = numericpart + 1;
                newOrderId = $"O{newnumericpart:d9}";
            }
            return newOrderId;
        }       
        
        // for cart
        public async Task<List<Order>> GetListOrderNotPaymentByAccountIdAsync(string accountId)
        {
            var listOrder = await _context.Orders
                .Where(order => order.AccountId.Equals(accountId) &&
                                order.Status == 1 &&
                                order.PaymentStatus == 0)
                .ToListAsync();
            return listOrder;
        }

        public async Task<double> GetTotalMoneyOfOrder(string orderId)
        {
            var orderDetails = await _context.OrderDetails
                                            .Where(item => item.OrderId.Equals(orderId))
                                            .ToListAsync();
            var totalMoney = (double)0;
            foreach (var item in orderDetails)
            {
                var flower = await _context.Flowers
                                    .FirstOrDefaultAsync(flower => flower.FlowerId.Equals(item.FlowerId));
                totalMoney += flower.Price * item.Quantity;
            }
            var order = await _context.Orders
                .FirstOrDefaultAsync(order => order.OrderId.Equals(orderId));
            order.TotalMoney = totalMoney;
            _context.Attach(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return totalMoney;
        }

        public async Task<Order> GetOrderById(string orderId)
        {
            return await _context.Orders
                .FirstOrDefaultAsync(item => item.OrderId.Equals(orderId)) ?? new Order();
        }

        public async Task<Order> GetOrderBySellerIdAsync(string? sellerId)
        {
            return await _context.Orders.FirstOrDefaultAsync(o => o.SellerId == sellerId);
        }
    }
}
