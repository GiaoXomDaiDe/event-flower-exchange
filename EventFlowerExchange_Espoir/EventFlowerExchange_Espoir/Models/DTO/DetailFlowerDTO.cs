namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class DetailFlowerDTO
    {
        public string FlowerId { get; set; }
        public string FlowerName { get; set; }

        public string CateName { get; set; }

        public string Description { get; set; }

        public string Size { get; set; }

        public string Condition { get; set; }

        public double Quantity { get; set; }

        public double Price { get; set; }
        public double OldPrice { get; set; }
        public double Discount { get; set; }
        public string ShopName { get; set; }

        public string DateExpiration { get; set; }
        public string Attachment { get; set; }
        public string TagIds { get; set; }
    }
}
