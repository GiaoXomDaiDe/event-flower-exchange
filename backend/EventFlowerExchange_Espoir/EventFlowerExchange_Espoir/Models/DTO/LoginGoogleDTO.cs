using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class LoginGoogleDTO
    {
        [Required(ErrorMessage = "The token is required")]
        public string FirebaseToken { get; set; }
    }
}
