using System;
using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdateEventDTO
    {
        [Required(ErrorMessage = "Event ID is required.")]
        public string EventId { get; set; } = null!; // Unique identifier for the event

        [Required(ErrorMessage = "Event Name is required.")]
        public string EventName { get; set; } = null!; // Name of the event

        public string? EventDesc { get; set; } // Description of the event (optional)

        [Required(ErrorMessage = "Start Time is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid Start Time format.")]
        public DateTime StartTime { get; set; } // Start time of the event

        [Required(ErrorMessage = "End Time is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid End Time format.")]
        [Compare("StartTime", ErrorMessage = "End Time must be after Start Time.")]
        public DateTime EndTime { get; set; } // End time of the event

        [Required(ErrorMessage = "Creator ID is required.")]
        public string CreateBy { get; set; } = null!; // ID of the creator (Seller)

        // Optional: You could also include a property for status if you want to allow it to be updated
        public int Status { get; set; } // Status of the event (e.g., 0 for active, 1 for inactive)

        // Additional properties can be added as needed
    }
}
