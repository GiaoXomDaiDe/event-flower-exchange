using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class EventCate
{
    public string EcateId { get; set; } = null!;

    public string Ename { get; set; } = null!;

    public string Edesc { get; set; } = null!;

    public string Status { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
    public bool IsActive { get; internal set; }
}
