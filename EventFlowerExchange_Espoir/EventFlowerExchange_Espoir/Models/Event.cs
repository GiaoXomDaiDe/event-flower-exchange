using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Event
{
    public string EventId { get; set; } = null!;

    public string EventName { get; set; } = null!;

    public string EcateId { get; set; } = null!;

    public string EventDesc { get; set; } = null!;

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }

    public int Status { get; set; }

    public string CreateBy { get; set; } = null!;

    public DateOnly CreateAt { get; set; }

    public DateOnly UpdateAt { get; set; }

    public string UpdateBy { get; set; } = null!;

    public virtual EventCate Ecate { get; set; } = null!;
}
