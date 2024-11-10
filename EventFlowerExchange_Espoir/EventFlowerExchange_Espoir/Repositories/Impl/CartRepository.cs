using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Repositories.Impl
{
    public class CartRepository : ICartRepository
    {
        private readonly EspoirDbContext _context;
        private readonly IAccountRepository _accountRepository;

        public CartRepository(EspoirDbContext context, IAccountRepository accountRepository)
        {
            _context = context;
            _accountRepository = accountRepository;
        }

        public async Task<List<OrderDetail>> GetCartItemsByOrderId(string orderId)
        {
            return await _context.OrderDetails.Where(c => c.OrderId == orderId).ToListAsync();
        }

        public async Task<OrderDetail> GetCartByOrderDetailId(string orderDetailId)
        {
            return await _context.OrderDetails.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetailId);
        }
        public async Task<OrderDetail> GetCartItemByFlowerIdAndAccountAsync(string flowerId, string accountId)
        {
            return await _context.OrderDetails.FirstOrDefaultAsync(c => c.FlowerId == flowerId && c.AccountId == accountId);
        }
        public async Task<OrderDetail> GetCartItemByCartIdAsync(string cartItemId)
        {
            return await _context.OrderDetails.FirstOrDefaultAsync(c => c.OrderDetailId == cartItemId);
        }

        public async Task<string> GetLatestOrderDetailIdAsync()
        {
            try
            {

                // Fetch the relevant data from the database
                var orderDetailIds = await _context.OrderDetails
                    .Select(u => u.OrderDetailId)
                    .ToListAsync();

                // Process the data in memory to extract and order by the numeric part
                var latestOrderDetailId = orderDetailIds
                    .Select(id => new { OrderDetailId = id, NumericPart = int.Parse(id.Substring(2)) })
                    .OrderByDescending(u => u.NumericPart)
                    .ThenByDescending(u => u.OrderDetailId)
                    .Select(u => u.OrderDetailId)
                    .FirstOrDefault();

                return latestOrderDetailId;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


        public async Task<List<CartListDTO>> GetListCartOfUser(string accountId)
        {
            var cartItemsWithFlowerNames = await _context.OrderDetails
                .Where(od => od.AccountId == accountId)
                .Join(_context.Flowers,
                      od => od.FlowerId,
                      f => f.FlowerId,
                      (od, f) => new CartListDTO
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
                .ToListAsync();

            return cartItemsWithFlowerNames;
        }

        public async Task<dynamic> AddToCartAsync(OrderDetail orderDetail)
        {
            await _context.OrderDetails.AddAsync(orderDetail);
            return await _context.SaveChangesAsync();
        }

        public async Task<dynamic> UpdateCartAsync(OrderDetail orderDetail)
        {
            _context.OrderDetails.Update(orderDetail);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<dynamic> CartAsync(OrderDetail orderDetail)
        {
            _context.OrderDetails.Remove(orderDetail);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<OrderDetail>> GetListCartItemByIdsString(string cartItemIdsString)
        {
            try
            {
                if (string.IsNullOrEmpty(cartItemIdsString))
                {
                    return new List<OrderDetail>(); // Return an empty list if the input is null or empty
                }

                var cartItemIds = cartItemIdsString.Split(',')
                                                   .Select(id => id.Trim())
                                                   .ToList();
                //var cartItems = await _context.OrderDetails
                //                              .Where(od => cartItemIds.Contains(od.OrderDetailId.ToString())) 
                //                              .ToListAsync();
                // Convert the list into a format suitable for SQL IN clause
                var formattedIds = string.Join("','", cartItemIds); // Format IDs for SQL IN clause
                var query = $"SELECT * FROM OrderDetails WHERE OrderDetailId IN ('{formattedIds}')";

                // Execute the raw SQL query to fetch OrderDetails
                var cartItems = await _context.OrderDetails.FromSqlRaw(query).ToListAsync();
                return cartItems;
            }
            catch (SqlException ex)
            {
                throw new Exception($"Error in GetListCartItemByIdsString: {ex.Message}");
            }

        }

        public async Task<dynamic> UpdateOrderDetails(List<OrderDetail> orderDetails)
        {
            try
            {
                foreach (var detail in orderDetails)
                {
                    _context.OrderDetails.Update(detail); // Assuming OrderDetails is the correct DbSet for order details
                }
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at OrderRepository: {ex.Message}");
            }
        }
        public async Task<dynamic> DeleteCartAsync(OrderDetail orderDetail)
        {
            _context.OrderDetails.Remove(orderDetail);
            return await _context.SaveChangesAsync() > 0;
        }



    }
}
