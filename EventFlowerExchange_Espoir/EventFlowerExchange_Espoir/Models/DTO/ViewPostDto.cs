using EventFlowerExchange_Espoir.Models.DTO.Post;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class ViewPostDto
    {
        public string PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Attachment { get; set; }
        public DateOnly CreatedAt { get; set; }
        public ViewEventDto ViewEvent { get; set; }
        public List<ViewPostDetailDto> ViewPostDetail { get; set; }
    }
}
