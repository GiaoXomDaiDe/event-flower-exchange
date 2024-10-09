namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class EventDto
    {
        public string EventId { get; set; }
        public string EventName { get; set; }
        public string EventDesc { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Status { get; set; }
        public string CreateBy { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public string UpdateBy { get; set; }
    }
}
