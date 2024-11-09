namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class OrderListDTO
    {
        public string OrderId { get; set; } = null!;

        public string Detail { get; set; } = null!;

        public DateOnly Date { get; set; }

        public string AccountId { get; set; } = null!;
        public string? SellerId { get; set; }
        public long Status { get; set; }

        public double TotalMoney { get; set; }

        public int PaymentStatus { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public ICollection<OrderDetailDTO> OrderDetails { get; set; }

    }
}
