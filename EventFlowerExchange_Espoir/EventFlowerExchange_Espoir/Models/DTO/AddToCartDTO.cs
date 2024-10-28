using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AddToCartDTO
    {
        [Required(ErrorMessage = "AccessToken is required")]
        public string accessToken { get; set; }
        [Required(ErrorMessage = "FlowerId is required")]
        public string FlowerName { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public double Quantity { get; set; }
    }
}
