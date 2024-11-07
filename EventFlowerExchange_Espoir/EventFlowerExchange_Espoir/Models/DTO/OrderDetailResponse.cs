namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class OrderDetailResponse
    {
        public string OrderDetailId { get; set; } = null!;
        public string? OrderId { get; set; }

        public Flower Flower { get; set; } = null!;
        public double Quantity { get; set; }

        public double PaidPrice { get; set; }

        public string? OrderNumber { get; set; }
    }


}
