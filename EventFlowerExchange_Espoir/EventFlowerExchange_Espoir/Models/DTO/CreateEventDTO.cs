using EventFlowerExchange_Espoir.Services.Common;
using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CreateEventDTO
    {
        [Required(ErrorMessage = "Event Name is required.")]
        public string EventName { get; set; }

        [Required(ErrorMessage = "Event Description is required.")]
        public string EventDesc { get; set; }

        [Required(ErrorMessage = "Start Time is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid Start Time format.")]
        public DateTime StartTime { get; set; }

        [Required(ErrorMessage = "End Time is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid End Time format.")]
        [DateAfter("StartTime", ErrorMessage = "End Time must be after Start Time.")]
        public DateTime EndTime { get; set; }

        [Required(ErrorMessage = "Creator ID is required.")]
        public string EcateId { get; set; }
        // Optional property; you may want to have a default value or not
        public int Status { get; set; } = 1; // Assuming 1 means active, adjust as necessary
    }
}