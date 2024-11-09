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

        public Task<Order> GetOrderById(string orderId);
        public Task<Order> GetOrderBySellerIdAsync(string? sellerId);

        public Task<List<Order>> GetAllOrders();
        public Task<int> GetNumberOfOrders();
        public Task<int> GetNumberOfOrderBasedOnStatus(int status);
        public Task<dynamic> GetNumberOrderOfSellerByStatus(string accountId, int status);

        public Task<dynamic> GetNumberOrderOfSeller(string accessToken);


        public Task<double> GetEarningOnAllOrders(string accountId);
        public Task<dynamic> GetOrderDetailsOfSeller(string sellerId);
    }
}
