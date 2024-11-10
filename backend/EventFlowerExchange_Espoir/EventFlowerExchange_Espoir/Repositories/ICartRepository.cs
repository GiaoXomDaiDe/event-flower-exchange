using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface ICartRepository
    {
        public Task<List<OrderDetail>> GetCartItemsByOrderId(string orderId);
        public Task<OrderDetail> GetCartByOrderDetailId(string orderDetailId);
        public Task<string> GetLatestOrderDetailIdAsync();
        public Task<List<CartListDTO>> GetListCartOfUser(string accountId);
        public Task<OrderDetail> GetCartItemByFlowerIdAndAccountAsync(string flowerId, string accountId);
        public Task<OrderDetail> GetCartItemByCartIdAsync(string cartItemId);
        public Task<dynamic> AddToCartAsync(OrderDetail orderDetail);
        public Task<dynamic> UpdateCartAsync(OrderDetail orderDetail);
        public Task<dynamic> DeleteCartAsync(OrderDetail orderDetail);
        public Task<List<OrderDetail>> GetListCartItemByIdsString(string cartItemIdsString);
        public Task<dynamic> UpdateOrderDetails(List<OrderDetail> orderDetails);
    }
}
