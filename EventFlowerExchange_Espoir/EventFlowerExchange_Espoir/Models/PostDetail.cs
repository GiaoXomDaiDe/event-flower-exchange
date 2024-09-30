using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class PostDetail
{
    public string PdetailId { get; set; } = null!;

    public string FlowerId { get; set; } = null!;

    public virtual Flower Flower { get; set; } = null!;

    public virtual ICollection<SellerPost> SellerPosts { get; set; } = new List<SellerPost>();
}
