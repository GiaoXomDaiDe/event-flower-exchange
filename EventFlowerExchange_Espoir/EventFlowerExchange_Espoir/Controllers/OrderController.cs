using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using System.Net;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/account")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }


        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrderFromCartItemSelected([FromForm] CreateOrderDTO orderDTO)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (orderDTO == null)
            {
                return BadRequest("All fields must be filled in");
            }
            var result = await _orderService.CreateAnOrderFromCartAsync(orderDTO);
            if(!result)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
