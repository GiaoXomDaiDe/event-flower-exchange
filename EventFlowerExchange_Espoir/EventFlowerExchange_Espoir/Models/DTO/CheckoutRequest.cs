﻿namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class CheckoutRequest
    {
        public string OrderId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}
