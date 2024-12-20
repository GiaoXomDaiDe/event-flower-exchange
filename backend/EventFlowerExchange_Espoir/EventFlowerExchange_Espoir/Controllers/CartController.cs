﻿using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/account")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCartAsync([FromForm] AddToCartDTO cartDTO)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (cartDTO == null)
            {
                return BadRequest("All field must be filled");
            }
            var result = await _cartService.AddToCartAsync(cartDTO);
            return Ok(result);
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete-cart-item")]
        public async Task<IActionResult> DeleteCartItemAsync(string cartItemId)
        {
            if (cartItemId == null)
            {
                return BadRequest("Cart Item Id is required");
            }
            var result = await _cartService.DeleteCartItemAsync(cartItemId);
            if (result)
            {
                return Ok("Delete successfully");
            }
            return BadRequest(result);
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update-cart-item")]
        public async Task<IActionResult> UpdateCartItemAsync(string orderDetailId, double quantity)
        {
            if (orderDetailId == null)
            {
                return BadRequest("Cart Item Id is required");
            }
            var result = await _cartService.UpdateCartAsync(orderDetailId, quantity);
            return Ok(result);
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("list-cart-items")]
        public async Task<IActionResult> GetListCartItems(string accessToken)
        {
            if (accessToken == null)
            {
                return BadRequest("Must fill in all field");
            }
            var result = await _cartService.GetCartListAsync(accessToken);
            return Ok(result);
        }
    }
}
