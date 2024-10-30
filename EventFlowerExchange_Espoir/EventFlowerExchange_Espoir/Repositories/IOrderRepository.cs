using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> GetOrderByAccountId(string accountId);
        public Task<string> GetLatestOrderIdAsync();
        public Task<string> AutoGenerateOrderId();
        public Task<Order> CreateOrder(Order order);
        public Task<dynamic> UpdateOrder(Order order);
        public Task<dynamic> DeleteOrder(Order order);

        public Task<List<Order>> GetListOrderNotPaymentByAccountIdAsync(string accountId);
        public Task<double> GetTotalMoneyOfOrder(string orderId);

    }
}
