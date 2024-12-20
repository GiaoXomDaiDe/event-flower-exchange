﻿using System;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Helpers
{
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            Items = items;
            TotalCount = count;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
    }
}