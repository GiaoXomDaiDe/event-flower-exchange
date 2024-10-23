using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;
using EventFlowerExchange_Espoir.Services.Common;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly ICartRepository _cartRepository;
        public OrderService(IOrderRepository orderRepository, IAccountRepository accountRepository, ICartRepository cartRepository)
        {
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
            _cartRepository = cartRepository;
        }
        public async Task<string> AutoGenerateOrderId()
        {
            string newOrderId = "";
            string latestOrderId = await _orderRepository.GetLatestOrderIdAsync();
            if (string.IsNullOrEmpty(latestOrderId))
            {
                newOrderId = "O00000001";
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
                totalAmount += item.PaidPrice; // Assuming you have Price and Quantity fields in the CartItem model

            }

            var newOrder = new Order
            {
                OrderId = await AutoGenerateOrderId(),
                AccountId = acc.AccountId,
                AdminID = null,
                Status = 1, // 1. Confirming order - 4. Delivering - 5. Shipped successfully
                PaymentStatus = 0, // 0. Paying 1.Paid
                DeliveryUnit = orderDTO.DeliveryUnit,
                TotalMoney = totalAmount,
            };
            await _orderRepository.CreateOrder(newOrder);
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
                NewOrder = newOrder,
                OrderDetails = orderDetails
            };
        }

    }
}
//var existOrder = await _orderRepository.GetOrderByAccountId(acc.AccountId);
//if (existOrder == null)
//{
//    return "Cannot find any orders of your account";
//}
//var cartItems = await _cartRepository.GetCartItemsByOrderId(existOrder.OrderId);
//if (cartItems == null)
//{
//    return "Your cart is empty";
//}

//existOrder.OrderId = existOrder.OrderId;
//existOrder.AccountId = acc.AccountId;
//existOrder.Date = DateOnly.FromDateTime(DateTime.Now);
//existOrder.Status = 1;
//existOrder.AdminID = "Empty";
//// 1. Paying - 2. Queuing to Confirm - 3. Paid(confirmed) - 4. Delivering - 5. Shipped successfully

//existOrder.TotalMoney = cartItems.Sum(ci => ci.PaidPrice * ci.Quantity); // calculate total pric;
//existOrder.DeliveryUnit = orderDTO.DeliveryUnit;
//existOrder.OrderDetails = cartItems.Select(ci => new OrderDetail
//{
//    OrderDetailId = ci.OrderDetailId,
//    OrderId = ci.OrderId,
//    FlowerId = ci.FlowerId,
//    Quantity = ci.Quantity,
//    PaidPrice = ci.PaidPrice,
//    OrderNumber = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10).ToUpper(),
//    AccountId = "Empty"
//}).ToList();
//var result = await _orderRepository.UpdateOrder(existOrder);
//return result;