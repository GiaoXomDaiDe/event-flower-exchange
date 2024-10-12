using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CreateEventCategoryDTO
    {
        [Required(ErrorMessage = "Event Category Name is required.")]
        public string Ename { get; set; } = null!; // Name of the event category

        [Required(ErrorMessage = "Event Category Description is required.")]
        public string Edesc { get; set; } = null!; // Description of the event category

        [Required(ErrorMessage = "Status is required.")]
        public string Status { get; set; } = "active"; // Status of the event category (e.g., active or inactive)

        [RegularExpression(@"^[A-Z]{2}\d{8}$", ErrorMessage = "Parent Category ID must be in the format of two uppercase letters followed by eight digits (e.g., PC00000001).")]
        public string? ParentCateId { get; set; } // Optional Parent Category ID
    }
}
