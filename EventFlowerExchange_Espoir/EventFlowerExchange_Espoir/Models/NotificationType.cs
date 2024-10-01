using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class NotificationType
{
    public string NotifyType { get; set; } = null!;

    public string NtypeDesc { get; set; } = null!;

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
