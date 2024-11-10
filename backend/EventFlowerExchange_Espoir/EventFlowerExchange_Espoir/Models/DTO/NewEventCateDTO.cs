using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class NewEventCateDTO
    {
        [Required(ErrorMessage = "Category ID is required")]
        public string EcateId { get; set; } = null!; // Unique identifier for the event category

        [Required(ErrorMessage = "Name is required")]
        public string Ename { get; set; } = null!; // Name of the event category

        [Required(ErrorMessage = "Description is required")]
        public string Edesc { get; set; } = null!; // Description of the event category

        public string? ParentCateId { get; set; } // Optional parent category ID

        public string Status { get; set; } = "active"; // Default status, could be 'active' or 'inactive'
    }
}
