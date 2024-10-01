using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class SellerWallet
{
    public string WalletId { get; set; } = null!;

    public string AccountId { get; set; } = null!;

    public long Balance { get; set; }

    public virtual Account Account { get; set; } = null!;
}
