using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
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
            return await _context.SaveChangesAsync() > 0;
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

        public async Task<List<Order>> GetAllOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<int> GetNumberOfOrders()
        {
            return await _context.Orders.CountAsync();
        }

        public async Task<int> GetNumberOfOrderBasedOnStatus(int status)
        {
            return await _context.Orders.CountAsync(item => item.Status == status);
        }
        public async Task<dynamic> GetNumberOrderOfSellerByStatus(string sellerId, int status)
        {
            return await _context.Orders.CountAsync(item => item.SellerId == sellerId && item.Status == status);
        }
        public async Task<dynamic> GetNumberOrderOfSeller(string sellerId)
        {
            return await _context.Orders.CountAsync(item => item.SellerId == sellerId);
        }
        public async Task<double> GetEarningOnAllOrders(string accountId)
        {
            var orders = await _context.Orders
                .Where(item => item.SellerId.Equals(accountId) &&
                                item.Status >= 4).ToListAsync();
            var totalEarnings = (double)0;
            foreach (var order in orders)
            {
                totalEarnings += order.TotalMoney;
            }
            return totalEarnings;
        }
        public async Task<dynamic> GetOrderDetailsOfSeller(string sellerId)
        {
            return await _context.Orders.Include(o => o.OrderDetails).Where(o => o.SellerId == sellerId).Select(o => new OrderListDTO
            {
                OrderId = o.OrderId,
                Detail = o.Detail,
                Date = o.Date,
                AccountId = o.AccountId,
                SellerId = sellerId,
                Status = o.Status,
                TotalMoney = o.TotalMoney,
                PaymentStatus = o.PaymentStatus,
                FullName = o.FullName,
                Address = o.Address,
                PhoneNumber = o.PhoneNumber,
                OrderDetails = o.OrderDetails
                .Where(od => od.OrderId == o.OrderId) // Filter by OrderId of the current order
                .Select(od => new OrderDetailDTO
                {
                    OrderDetailId = od.OrderDetailId,
                    FlowerId = od.FlowerId,
                    Quantity = od.Quantity,
                    PaidPrice = od.PaidPrice,
                    // Map other OrderDetail properties here if needed
                })
                .ToList()
            }).ToListAsync();
        }

        public async Task<dynamic> GetOrderDetailsOfBuyer(string accountId)
        {
            return await _context.Orders.Include(o => o.OrderDetails).Where(o => o.AccountId == accountId).Select(o => new OrderListDTO
            {
                OrderId = o.OrderId,
                Detail = o.Detail,
                Date = o.Date,
                AccountId = o.AccountId,
                SellerId = o.SellerId,
                Status = o.Status,
                TotalMoney = o.TotalMoney,
                PaymentStatus = o.PaymentStatus,
                FullName = o.FullName,
                Address = o.Address,
                PhoneNumber = o.PhoneNumber,
                OrderDetails = o.OrderDetails
                .Where(od => od.OrderId == o.OrderId) // Filter by OrderId of the current order
              .Join(_context.Flowers,
                      od => od.FlowerId,
                      f => f.FlowerId,
                      (od, f) => new OrderDetailDTO
                      {
                          OrderDetailId = od.OrderDetailId,
                          OrderId = od.OrderId,
                          FlowerId = od.FlowerId,
                          FlowerName = f.FlowerName,
                          Quantity = od.Quantity,
                          Price = f.Price,
                          PaidPrice = od.PaidPrice,
                          FlowerImage = f.Attachment,
                          OrderNumber = od.OrderNumber,
                          AccountId = od.AccountId
                      })
                .ToList()
            }).ToListAsync();
        }
    }
}
