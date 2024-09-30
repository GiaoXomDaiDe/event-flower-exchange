using System.ComponentModel.DataAnnotations;

namespace SWPVS.Models
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        public DateTime Birthday { get; set; }

        [Required]
        public int Gender { get; set; } // 1: Male, 2: Female
    }
}