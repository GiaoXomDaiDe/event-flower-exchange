using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class FlowerListDTO
    {
        public string FlowerName { get; set; }

        public string Category { get; set; }
        public string Description { get; set; }

        public string Size { get; set; }

        public string Condition { get; set; }

        public double Quantity { get; set; }


        public double Price { get; set; }

        public double OldPrice { get; set; } = 0;
        public string DateExpiration { get; set; }
        public string Attachment {  get; set; }
        public string? TagNames { get; set; }
        public object Shop { get; set; }

    }
}
