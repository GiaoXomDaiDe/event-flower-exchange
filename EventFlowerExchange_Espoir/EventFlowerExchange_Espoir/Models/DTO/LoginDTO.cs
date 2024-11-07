using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$",
        ErrorMessage = "Password must have at least 6 characters, an uppercase letter, and a special character")]
        public string Password { get; set; } = null!;
    }
}
