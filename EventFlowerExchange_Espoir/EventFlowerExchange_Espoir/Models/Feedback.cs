using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Feedback
{
    public string FeedbackId { get; set; } = null!;

    public string Detail { get; set; } = null!;

    public double Rating { get; set; }

    public string? Attachment { get; set; }

    public string FlowerId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public bool IsGoodReview { get; set; }

    public virtual Flower Flower { get; set; } = null!;
}
