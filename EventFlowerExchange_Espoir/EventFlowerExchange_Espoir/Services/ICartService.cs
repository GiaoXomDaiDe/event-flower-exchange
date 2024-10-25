using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface ICartService
    {
        public Task<dynamic> AddToCartAsync(AddToCartDTO cartDTO);
        public Task<dynamic> DeleteCartItemAsync(string cartItemId);
        public Task<dynamic> UpdateCartAsync(string cartItemId, double quantity);
        public Task<dynamic> GetCartAsync(string accessToken);
    }
}
