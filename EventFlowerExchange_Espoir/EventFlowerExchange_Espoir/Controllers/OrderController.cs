using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using System.Net;
using System.Security.Claims;

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

            return Ok(result);
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("checkout-order")]
        public async Task<IActionResult> CreateOrderForCheckout(CheckoutRequest request)
        {
            await _orderService.CheckoutRequest(request);
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Message = "Checkout successful! Please call API Payment for the next steps!"
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("finish-delivering-stage")]
        public async Task<IActionResult> FinishDeliveringStage(string orderId)
        {
            await _orderService.FinishDeliveringStage(orderId);
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Message = "Finish delivering stage!"
            });
        }



        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = orders
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("get-number-of-orders")]
        public async Task<IActionResult> GetNumberOfOrders()
        {
            var numberOfOrders = await _orderService.GetNumberOfOrders();
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = numberOfOrders
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("get-number-orders-by-status")]
        public async Task<IActionResult> GetNumberOfOrderByStatus(int status)
        {
            var numberOfOrders = await _orderService.GetNumberOfOrderBasedOnStatus(status);
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = numberOfOrders
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("get-total-earnings")]
        public async Task<IActionResult> GetTotalEarnings()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.Claims.FirstOrDefault().Value;
            var totalEarnings = await _orderService.GetTotalEarnings(userEmail);
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = totalEarnings
            });
        }

        [HttpGet("orders-of-seller")]
        public async Task<IActionResult> GetOrderDetailsOfSeller(string sellerId)
        {
            if (string.IsNullOrWhiteSpace(sellerId))
            {
                return BadRequest("Seller must not be null");
            }
            var result = await _orderService.GetOrderDetailsOfSeller(sellerId);
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = result
            });
        }
    }
}
