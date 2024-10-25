using EventFlowerExchange_Espoir.Models;
using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Order
{
    public string OrderId { get; set; } = null!;

    public string Detail { get; set; } = null!;

    public DateOnly Date { get; set; }

    public string AccountId { get; set; } = null!;
    public string? AdminID { get; set; }
    public long Status { get; set; }

    public double TotalMoney { get; set; }

    public int PaymentStatus { get; set; }

    public string DeliveryUnit { get; set; } = null!;

    public virtual Account Account { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
