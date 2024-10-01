using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class CardProvider
{
    public string CardProviderName { get; set; } = null!;

    public string CpfullName { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
