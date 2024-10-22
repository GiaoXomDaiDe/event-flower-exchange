namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AddToCartDTO
    {
        public string? accessToken { get; set; } 
        public string? Detail { get; set; }

        public DateOnly Date { get; set; }

        public double TotalMoney { get; set; }

        public int PaymentStatus { get; set; }

        public string DeliveryUnit { get; set; }
    }
}
