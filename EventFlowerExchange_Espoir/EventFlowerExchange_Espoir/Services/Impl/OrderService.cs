using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;
using EventFlowerExchange_Espoir.Services.Common;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly EspoirDbContext _context;
        public OrderService(IOrderRepository orderRepository, IAccountRepository accountRepository, ICartRepository cartRepository, EspoirDbContext context, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
            _cartRepository = cartRepository;
            _context = context;
            _productRepository = productRepository;
        }
        public async Task<string> AutoGenerateOrderId()
        {
            string newOrderId = "";
            string latestOrderId = await _orderRepository.GetLatestOrderIdAsync();
            if (string.IsNullOrEmpty(latestOrderId))
            {
                newOrderId = "O000000001";
            }
            else
            {
                int numericpart = int.Parse(latestOrderId.Substring(1));
                int newnumericpart = numericpart + 1;
                newOrderId = $"O{newnumericpart:d9}";
            }
            return newOrderId;
        }

        public async Task<dynamic> CreateAnOrderFromCartAsync(CreateOrderDTO orderDTO)
        {
            var accountEmail = TokenDecoder.GetEmailFromToken(orderDTO.accessToken);
            var acc = await _accountRepository.GetAccountByEmailAsync(accountEmail);
            if (acc == null)
            {
                return "Cannot find your account";
            }
            var cartItems = await _cartRepository.GetListCartItemByIdsString(orderDTO.CartItemIds);


            double totalAmount = 0;

            foreach (var item in cartItems)
            {

                if (item.AccountId != acc.AccountId)
                {
                    return new
                    {
                        StatusCode = 403,
                        Message = $"This cart {item.OrderDetailId} is not belong to your account"
                    };
                }
                totalAmount += item.PaidPrice; // Assuming you have Price and Quantity fields in the CartItem model
                var flower = await _productRepository.GetFlowerByFlowerIdAsync(item.FlowerId);
                if (flower == null)
                {
                    return "Flower cannot be found";
                }
                flower.Quantity = flower.Quantity - item.Quantity;
            }
            if (cartItems.Count == 0)
            {
                return new
                {
                    Message = "Cart Items is not exist",
                    StatusCode = 404
                };
            }
            else
            {
                var newOrder = new Order
                {
                    OrderId = await AutoGenerateOrderId(),
                    AccountId = acc.AccountId,
                    SellerId = null,
                    Detail = $"Total of product in order is {cartItems.Count}",
                    Status = 1, // 1. Confirming order - 4. Delivering - 5. Shipped successfully
                    PaymentStatus = 0, // 0. Paying 1.Paid
                    TotalMoney = totalAmount,
                    Date = DateOnly.FromDateTime(DateTime.Now),
                    OrderDetails = cartItems
                };
                await _orderRepository.CreateOrder(newOrder);
                // Detach the tracked cartItems to prevent conflicts
                foreach (var item in cartItems)
                {
                    _context.Entry(item).State = EntityState.Detached;
                }

                var orderDetails = cartItems.Select(ci => new OrderDetail
                {
                    OrderDetailId = ci.OrderDetailId,
                    OrderId = newOrder.OrderId,
                    FlowerId = ci.FlowerId,
                    Quantity = ci.Quantity,
                    PaidPrice = ci.PaidPrice,
                    OrderNumber = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10).ToUpper(),
                    AccountId = newOrder.AccountId,
                }).ToList();
                await _cartRepository.UpdateOrderDetails(orderDetails);
                return new
                {
                    StatusCode = 201,
                    Message = "Create Order Successfull",
                    NewOrder = new
                    {
                        newOrder.OrderId,
                        newOrder.Account.FullName,
                        newOrder.Date,
                        newOrder.Status,
                        newOrder.TotalMoney,
                        newOrder.PaymentStatus,
                    },

                };
            }

        }

    }
}
