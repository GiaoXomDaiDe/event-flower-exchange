using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateSellerProfileDTO
    {
        [Required(ErrorMessage = "Tax Number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Tax Number must be exactly 10 digits")]
        public string? TaxNumber { get; set; }

        public string? SellerAvatar { get; set; }

        public string? SellerAddress { get; set; }

        public string ShopName { get; set; }
    }
}
