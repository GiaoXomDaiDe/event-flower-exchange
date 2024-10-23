using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IOrderService
    {
        public Task<dynamic> CreateAnOrderFromCartAsync(CreateOrderDTO orderDTO);
    }
}
