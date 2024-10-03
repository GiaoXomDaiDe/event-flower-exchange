using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AccountDTO
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$",
        ErrorMessage = "Password must have at least 6 characters, an uppercase letter, and a special character")]
        public string Password { get; set; } = null!;

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
        public int Status { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = null!;

        [Required(ErrorMessage = "Gender is required")]
        public int Gender { get; set; }


    }
}
