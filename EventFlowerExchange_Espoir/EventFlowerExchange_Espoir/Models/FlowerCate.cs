using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class FlowerCate
{
    public string FcateId { get; set; } = null!;

    public string FcateName { get; set; } = null!;

    public string FcateDesc { get; set; } = null!;

    public string? FparentCateId { get; set; }

    public int Status { get; set; }

    public int IsDeleted { get; set; }

    public virtual ICollection<Flower> Flowers { get; set; } = new List<Flower>();
}
