using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class PayoutHistory
{
    public string PayoutId { get; set; } = null!;

    public double Amount { get; set; }

    public DateOnly PayoutDate { get; set; }

    public int Status { get; set; }

    public string UserId { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
