using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class SellerPost
{
    public string PostId { get; set; } = null!;

    public string AccountId { get; set; } = null!;
    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string Attachment { get; set; } = null!;

    public DateOnly CreateAt { get; set; }
    public DateOnly UpdatedAt { get; set; }
    public string EventId { get; set; } = null!;
    public virtual Event Event { get; set; } = null!;

    public int HadEvent { get; set; }

    public virtual ICollection<PostDetail> PostDetails { get; set; }
}