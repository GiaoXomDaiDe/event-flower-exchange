namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CartItemViewDTO
    {
        public SellerInCartDTO Seller { get; set; }
        public List<OrderDetailResponse> OrderDetails { get; set; }
    }
}
