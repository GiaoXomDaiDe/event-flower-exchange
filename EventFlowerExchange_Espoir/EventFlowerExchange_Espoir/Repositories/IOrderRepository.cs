using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> GetOrderByAccountId(string accountId);
        public Task<string> GetLatestOrderIdAsync();
        public Task<dynamic> CreateOrder(Order order);
        public Task<dynamic> UpdateOrder(Order order);
        public Task<dynamic> DeleteOrder(Order order);
    }
}
