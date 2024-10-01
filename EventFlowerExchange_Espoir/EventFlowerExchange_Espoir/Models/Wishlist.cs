using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Wishlist
{
    public string WishlistId { get; set; } = null!;

    public string AddBy { get; set; } = null!;

    public string FlowerId { get; set; } = null!;

    public virtual Flower Flower { get; set; } = null!;
}
