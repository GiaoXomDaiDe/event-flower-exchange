namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class ListFeedbackDTO
    {
        public string FeedbackId { get; set; } = null!;

        public string Detail { get; set; } = null!;

        public double Rating { get; set; }

        public string FlowerId { get; set; } = null!;

        public string AccountId { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public bool IsGoodReview { get; set; }

    }
}
