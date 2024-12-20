﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AddToCartDTO
    {
        [Required(ErrorMessage = "AccessToken is required")]
        public string accessToken { get; set; }
        [Required(ErrorMessage = "FlowerId is required")]
        public string FlowerID { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        [DefaultValue(1)]
        public double Quantity { get; set; } 
    }
}
