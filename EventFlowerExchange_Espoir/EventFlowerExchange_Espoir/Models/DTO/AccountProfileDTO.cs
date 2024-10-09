using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AccountProfileDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Fullname is required")]
        public string Fullname { get; set; } = null!;

        [Required(ErrorMessage = "Fullname is required")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Phone is required")]
        [RegularExpression(@"^((\(84\)|84)?0?|0)?\d{9}$", ErrorMessage = "Invalid phone number format")]
        public string Phone { get; set; } = null!;

        [Required(ErrorMessage = "Birthday is required")]
        [DataType(DataType.Date, ErrorMessage = "Invalid date format")]

        public DateOnly Birthday { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = null!;

        [Required(ErrorMessage = "Gender is required")]
        public int Gender { get; set; }

    }
}
