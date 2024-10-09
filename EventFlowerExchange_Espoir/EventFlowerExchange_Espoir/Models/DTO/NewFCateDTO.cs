using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class NewFCateDTO
    {
        [Required(ErrorMessage = "Name is required")]
        public string FcateName { get; set; } = null!;

        [Required(ErrorMessage = "Descripition is required")]
        public string FcateDesc { get; set; } = null!;

        public string? FparentCateId { get; set; }
    }
}
