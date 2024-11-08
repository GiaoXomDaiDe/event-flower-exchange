namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CreatePostDto
    {
        public string AccountEmail { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Attachment { get; set; }
        public string EventId { get; set; }
        public int HadEvent { get; set; }
        public List<PostDetailCreateDto> PostDetails { get; set; }
    }
}
