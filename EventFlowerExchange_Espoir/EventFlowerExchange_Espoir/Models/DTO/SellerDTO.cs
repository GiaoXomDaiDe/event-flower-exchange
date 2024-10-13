using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class SellerDTO
    {
        [Required(ErrorMessage = "AccessToken is required")]
        public string AccessToken { get; set; }
        [Required(ErrorMessage = "CardName is required")]
        public string CardName { get; set; }
        [Required(ErrorMessage = "CardNumber is required")]
        public string CardNumber { get; set; }
        [Required(ErrorMessage = "CardProviderName is required")]
        public string CardProviderName { get; set; }
        [Required(ErrorMessage = "TaxNumber is required")]
        public string TaxNumber { get; set; }
        public string? SellerAvatar { get; set; }

        public string? SellerAddress { get; set; }
        public string ShopName { get; set; } = null!;
    }
}
