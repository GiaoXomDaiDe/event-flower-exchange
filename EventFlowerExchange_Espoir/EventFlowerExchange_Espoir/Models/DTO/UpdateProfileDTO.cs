using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateProfileDTO
    {
        [Required(ErrorMessage = "Token is required")]
        public string Token { get; set; }

        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;

        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string EmailAddress { get; set; } = string.Empty;
        public string Address {  get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateOnly? Birthday { get; set; }
        public int? Gender { get; set; } 
    }
}
