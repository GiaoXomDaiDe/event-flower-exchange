using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Notification
{
    public string NotifyId { get; set; } = null!;

    public string NotifyType { get; set; } = null!;

    public string NotiTitle { get; set; } = null!;

    public string NotiContent { get; set; } = null!;

    public string NotiBy { get; set; } = null!;

    public DateOnly NotiAt { get; set; }

    public string AccountId { get; set; } = null!;

    public bool NotiStatus { get; set; }

    public virtual NotificationType NotifyTypeNavigation { get; set; } = null!;
}
