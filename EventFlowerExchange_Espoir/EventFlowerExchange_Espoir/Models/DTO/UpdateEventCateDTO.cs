using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateEventCateDTO
    {
        [Required(ErrorMessage = "Event Category ID is required")]
        public string EcateId { get; set; } = null!; // Unique identifier for the event category

        public string? Ename { get; set; } // Name of the event category (optional)
        public string? Edesc { get; set; } // Description of the event category (optional)

        public string? Status { get; set; } // Optional status update
    }
}
