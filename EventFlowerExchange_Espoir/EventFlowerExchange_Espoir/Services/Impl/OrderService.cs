using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services.Common;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;

        public OrderService(IOrderRepository orderRepository, IAccountRepository accountRepository)
        {
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
        }

        public async Task<dynamic> AddProductToCartAsync(AddToCartDTO cart)
        {
            string cusEmail = TokenDecoder.GetEmailFromToken(cart.accessToken);
            if (cart.accessToken == null)
            {
                return "Cannot authorize this account";
            }
            var cus = await _accountRepository.GetAccountByEmailAsync(cusEmail);
            if (cus == null)
            {
                return "Cannot find your account";
            }
            //var newCart = new AddToCartDTO
            //{
            //    OrderId = "",

            //};
            return null;
        }
    }
}
