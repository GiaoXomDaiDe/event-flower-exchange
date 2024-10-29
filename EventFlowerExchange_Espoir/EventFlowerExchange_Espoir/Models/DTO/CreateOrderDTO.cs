using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CreateOrderDTO
    {
        public string accessToken { get; set; }
        
        public string CartItemIds { get; set; }
    }
}
