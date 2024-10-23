using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateFlowerDTO
    {
        public string? FlowerId { get; set; }
        public string? FlowerName { get; set; }

        [RegularExpression(@"^[A-Z]{2}\d{8}$", ErrorMessage = "CateId must be in the format of two uppercase letters followed by eight digits (e.g., FC00000001).")]
        public string? CateId { get; set; }
        public string? Description { get; set; }

        public string? Size { get; set; }

        public string? Condition { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
        public double Quantity { get; set; } = 0;

        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public double OldPrice { get; set; } = 0;

        [Range(0, double.MaxValue, ErrorMessage = "OldPrice cannot be negative.")]
        public double Discount { get; set; } = 0;
        public string? DateExpiration { get; set; }

    }
}
