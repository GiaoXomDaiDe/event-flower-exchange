using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class OrderDetail
{
    public string OrderDetailId { get; set; } = null!;

    public string? OrderId { get; set; }

    public string FlowerId { get; set; } = null!;
    public double Quantity { get; set; }

    public double PaidPrice { get; set; }

    public string? OrderNumber { get; set; }

    public string AccountId { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
