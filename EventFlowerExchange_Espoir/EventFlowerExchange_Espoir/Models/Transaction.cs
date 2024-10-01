using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Transaction
{
    public string TransactionId { get; set; } = null!;

    public string Detail { get; set; } = null!;

    public DateOnly Date { get; set; }

    public int Status { get; set; }

    public string AccountId { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;
}
