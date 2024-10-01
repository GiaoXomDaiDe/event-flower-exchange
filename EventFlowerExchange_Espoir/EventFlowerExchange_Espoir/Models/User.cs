using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public int IsSeller { get; set; }

    public string? CardName { get; set; }

    public string? CardNumber { get; set; }

    public string? CardProviderName { get; set; }

    public string? TaxNumber { get; set; }

    public string? SellerAvatar { get; set; }

    public string? SellerAddress { get; set; }

    public virtual Account Account { get; set; } = null!;

    public virtual CardProvider? CardProviderNameNavigation { get; set; }

    public virtual ICollection<PayoutHistory> PayoutHistories { get; set; } = new List<PayoutHistory>();
}
