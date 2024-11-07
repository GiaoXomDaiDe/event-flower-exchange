using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateAccountProfileDTO
    {
        public string? Email { get; set; }

        public string? Fullname { get; set; }

        public string? Username { get; set; }

        public string? Phone { get; set; }

        public DateOnly? Birthday { get; set; }

        public string? Address { get; set; }

        public int Gender { get; set; } = 0;

    }
}
