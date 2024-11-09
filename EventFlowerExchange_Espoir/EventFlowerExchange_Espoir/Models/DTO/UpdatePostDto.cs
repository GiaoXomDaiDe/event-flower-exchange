using EventFlowerExchange_Espoir.Models.DTO.Post;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class UpdatePostDto
    {
        public string PostId { get; set; }
        public string AccountEmail { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Attachment { get; set; }
        public string EventId { get; set; }
        public int HadEvent { get; set; }
        public List<UpdatePostDetailDto> ListPostDetails { get; set; }
    }
}
