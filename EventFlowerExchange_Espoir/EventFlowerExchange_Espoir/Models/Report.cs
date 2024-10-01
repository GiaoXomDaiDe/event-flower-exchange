using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Models;

public partial class Report
{
    public string ReportId { get; set; } = null!;

    public string Issue { get; set; } = null!;

    public string? Content { get; set; }

    public string Attachment { get; set; } = null!;

    public DateOnly CreateAt { get; set; }

    public string CreateBy { get; set; } = null!;

    public string FlowerId { get; set; } = null!;

    public virtual Flower Flower { get; set; } = null!;
}
