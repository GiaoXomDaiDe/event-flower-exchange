namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CartListDTO
    {
        public string OrderDetailId { get; set; }
        public double Quantity { get; set; }
        public double PaidPrice { get; set; }
        public string FlowerId { get; set; }
        public string FlowerName { get; set; }
        public string OrderId { get; set; }
        public string OrderNumber { get; set; }
        public string AccountId { get; set; }
    }
}
