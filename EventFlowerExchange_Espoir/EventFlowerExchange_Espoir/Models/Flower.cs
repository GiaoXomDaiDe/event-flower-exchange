using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Flower
{
    public string FlowerId { get; set; } = null!;

    public string FlowerName { get; set; } = null!;

    public string CateId { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Size { get; set; } = null!;

    public string Condition { get; set; } = null!;

    public double Quantity { get; set; }

    public double Price { get; set; }

    public double OldPrice { get; set; }

    public string AccountId { get; set; } = null!;

    public DateOnly CreatedAt { get; set; }

    public string DateExpiration { get; set; } = null!;

    public DateTime? UpdateAt { get; set; }

    public string? UpdateBy { get; set; }

    public int IsDeleted { get; set; }

    public int Status { get; set; }

    public string Attachment { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;

    public virtual FlowerCate Cate { get; set; } = null!;

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<PostDetail> PostDetails { get; set; } = new List<PostDetail>();

    public virtual ICollection<Report> Reports { get; set; } = new List<Report>();

    public string? TagIds { get; set; } = string.Empty; // Concatenated TagIds as a string


    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();

}
