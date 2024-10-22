using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class FlowerTag
{
    public string TagId { get; set; } = null!;

    public string TagName { get; set; } = null!;
    public virtual ICollection<Flower> Flowers { get; set; } = new List<Flower>();

}
