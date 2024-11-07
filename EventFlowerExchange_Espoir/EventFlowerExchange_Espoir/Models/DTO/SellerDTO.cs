using EventFlowerExchange_Espoir.Services.Common;
using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class SellerDTO
    {
        [Required(ErrorMessage = "AccessToken is required")]
        public string AccessToken { get; set; }
        [Required(ErrorMessage = "CardName is required")]
        public string CardName { get; set; }
        [Required(ErrorMessage = "Card Number is required")]
        [RegularExpression(@"^\d{16}$", ErrorMessage = "Card Number must be exactly 16 digits")]
        public string CardNumber { get; set; }
        [Required(ErrorMessage = "CardProviderName is required")]
        public string CardProviderName { get; set; }
        [Required(ErrorMessage = "Tax Number is required")]
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Tax Number must be exactly 10 digits")]
        public string TaxNumber { get; set; }
        public IFormFile AttachmentFiles { get; set; }

        public string? SellerAddress { get; set; }
        [Required(ErrorMessage = "Name of shop is required")]
        [UniqueShopName(ErrorMessage = "This shop name is already exist. Please try another.")]
        public string ShopName { get; set; }

    }
}
