using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IOrderService
    {
        public Task<dynamic> CreateAnOrderFromCartAsync(CreateOrderDTO orderDTO);
        public Task<double> RetrieveTotalMoneyByOrderId(string orderId);
        public Task CheckoutRequest(CheckoutRequest request);
        public Task FinishDeliveringStage(string orderId);
        public Task<List<Order>> GetAllOrders();
        public Task<int> GetNumberOfOrders();
        public Task<int> GetNumberOfOrderBasedOnStatus(int status);
        public Task<double> GetTotalEarnings(string accountEmail);

    }
}
