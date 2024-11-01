using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CreateProductDTO
    {
        [Required(ErrorMessage = "Flower Name is required")]
        public string FlowerName { get; set; }

        [Required(ErrorMessage = "CateId is required.")]
        [RegularExpression(@"^[A-Z]{2}\d{8}$", ErrorMessage = "CateId must be in the format of two uppercase letters followed by eight digits (e.g., FC00000001).")]
        public string CateId { get; set; }
        [Required(ErrorMessage = "Flower Description is required")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Flower Size is required")]
        public string Size { get; set; }

        [Required(ErrorMessage = "Flower Condition is required")]
        public string Condition { get; set; }

        [Required(ErrorMessage = "Quantity is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
        public double Quantity { get; set; }

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
        public double Price { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Price cannot be negative.")]
        public double OldPrice { get; set; } = 0;
        [Required(ErrorMessage = "Flower's Date Expiration is required")]
        public string DateExpiration { get; set; } 

        public string? TagIds { get; set; }

        //public List<string> AttachmentUris { get; set; }
        public List<IFormFile> AttachmentFiles { get; set; }
    }
}
