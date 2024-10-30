using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EventFlowerExchange_Espoir.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : Controller
    {
        private readonly IPaymentService _paymentService;
        private readonly ITransactionService _transactionService;
        private readonly IAccountService _accountService;
        private readonly IOrderRepository _orderRepository;

        public PaymentController(IPaymentService paymentService,
            ITransactionService transactionService,
            IAccountService accountService,
            IOrderRepository orderRepository)
        {
            _paymentService = paymentService;
            _transactionService = transactionService;
            _accountService = accountService;
            _orderRepository = orderRepository;
        }

        [HttpGet("create-payment-link")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreatePaymentLink(string orderId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.Claims.FirstOrDefault().Value;
            var account = await _accountService.GetAccountByEmailAsync(userEmail);
            if (account == null)
            {
                return NotFound();
            }
            var paymentLink = await _paymentService.CreatePaymentLink(orderId, account.AccountId);
            return Ok(paymentLink);
        }

        [HttpGet("get-total-money")]
        public async Task<IActionResult> GetTotalMoneyOfOrder(string orderId)
        {
            var totalMoney = await _orderRepository.GetTotalMoneyOfOrder(orderId);
            return Ok(totalMoney);
        }
    }
}
