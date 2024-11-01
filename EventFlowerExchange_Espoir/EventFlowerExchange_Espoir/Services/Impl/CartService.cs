using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;
using EventFlowerExchange_Espoir.Services.Common;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly ISellerRepository _sellerRepository;
        public CartService(ICartRepository cartRepository, IAccountRepository accountRepository, IProductRepository productRepository, IOrderRepository orderRepository, ISellerRepository sellerRepository)
        {
            _cartRepository = cartRepository;
            _accountRepository = accountRepository;
            _productRepository = productRepository;
            _orderRepository = orderRepository;
            _sellerRepository = sellerRepository;
        }
        public async Task<string> AutoGenerateOrderDetailId()
        {
            string newOrderDetailId = "";
            string latestOrderDetailId = await _cartRepository.GetLatestOrderDetailIdAsync();
            if (string.IsNullOrEmpty(latestOrderDetailId))
            {
                newOrderDetailId = "OD00000001";
            }
            else
            {
                int numericpart = int.Parse(latestOrderDetailId.Substring(2));
                int newnumericpart = numericpart + 1;
                newOrderDetailId = $"OD{newnumericpart:d8}";
            }
            return newOrderDetailId;
        }

        //else
        //{
        //    var existOrder = await _orderRepository.GetOrderBySellerIdAsync(flower.AccountId);

        //    if (existOrder != null)
        //    {
        //        var item = new OrderDetail
        //        {
        //            OrderDetailId = await AutoGenerateOrderDetailId(),
        //            OrderId = existOrder.OrderId,
        //            FlowerId = flowerId,
        //            Quantity = cartDTO.Quantity,
        //            PaidPrice = cartDTO.Quantity * flower.Price,
        //            AccountId = buyer.AccountId,
        //        };
        //        await _cartRepository.AddToCartAsync(item);
        //        return new
        //        {
        //            Message = "Add To Cart Successful",
        //            StatusCode = 201,
        //            Item = new
        //            {
        //                item.FlowerId,
        //                flower.FlowerName,
        //                item.Quantity,
        //                item.PaidPrice,
        //                UnitPrice = flower.Price,
        //            }
        //        };
        //    }
        public async Task<dynamic> AddToCartAsync(AddToCartDTO cartDTO)
        {
            var buyerEmail = TokenDecoder.GetEmailFromToken(cartDTO.accessToken);
            var buyer = await _accountRepository.GetAccountByEmailAsync(buyerEmail);
            if (buyer == null)
            {
                return new
                {
                    Message = "Cannot find your account",
                    StatusCode = 404
                };
            }
            var flower = await _productRepository.GetFlowerByFlowerIdAsync(cartDTO.FlowerID);
            if (flower == null)
            {
                return new
                {
                    Message = "Flower is not already exist",
                    StatusCode = 404
                };
            }
            if (flower.AccountId == buyer.AccountId)
            {
                return new
                {
                    Message = "Cannot Buy This Product! Flower is your shop's owner"
                };
            }
            if (cartDTO.Quantity > flower.Quantity)
            {
                return new
                {
                    Message = $"Exceed the total number of flowers in stock",
                    StatusCode = 409
                };
            }
            string flowerId = flower.FlowerId;
            var existProductInCart = await _cartRepository.GetCartItemByFlowerIdAndAccountAsync(flowerId, buyer.AccountId);

            if (existProductInCart != null)
            {
                existProductInCart.Quantity = existProductInCart.Quantity + cartDTO.Quantity;
                existProductInCart.PaidPrice = flower.Price * existProductInCart.Quantity;
                await _cartRepository.UpdateCartAsync(existProductInCart);
                return new
                {
                    Message = "Add to exist product in cart successful",
                    StatusCode = 201,
                    ExistCart = new
                    {
                        existProductInCart.FlowerId,
                        flower.FlowerName,
                        existProductInCart.Quantity,
                        existProductInCart.PaidPrice,
                        UnitPrice = flower.Price,
                    }
                };
            }
            else
            {
                //var seller = await _accountRepository.GetUserByAccountIdAsync(flower.AccountId);
                var ordersInCart = await _orderRepository.GetListOrderNotPaymentByAccountIdAsync(buyer.AccountId);

                foreach (var item in ordersInCart)
                {
                    if (item.SellerId.Equals(flower.AccountId))
                    {
                        var orderDetail = new OrderDetail
                        {
                            OrderDetailId = await AutoGenerateOrderDetailId(),
                            OrderId = item.OrderId,
                            FlowerId = flowerId,
                            Quantity = cartDTO.Quantity,
                            PaidPrice = cartDTO.Quantity * flower.Price,
                            AccountId = buyer.AccountId,
                        };
                        await _cartRepository.AddToCartAsync(orderDetail);
                        return new
                        {
                            Message = "Add To Cart Successful",
                            StatusCode = 201,
                            Item = new
                            {
                                orderDetail.FlowerId,
                                flower.FlowerName,
                                orderDetail.Quantity,
                                orderDetail.PaidPrice,
                                UnitPrice = flower.Price,
                            }
                        };
                    }
                }
                var order = await _orderRepository.CreateOrder(new Order()
                {
                    OrderId = await _orderRepository.AutoGenerateOrderId(),
                    AccountId = buyer.AccountId,
                    SellerId = flower.AccountId,
                    Date = DateOnly.FromDateTime(DateTime.Now),
                    Status = 1,
                    PaymentStatus = 0,
                    TotalMoney = 0,
                    Detail = "",
                    FullName = buyer.FullName,
                    Address = buyer.Address,
                    PhoneNumber = buyer.PhoneNumber
                });

                var cartItem = new OrderDetail
                {
                    OrderDetailId = await AutoGenerateOrderDetailId(),
                    OrderId = order.OrderId,
                    FlowerId = flowerId,
                    Quantity = cartDTO.Quantity,
                    PaidPrice = cartDTO.Quantity * flower.Price,
                    AccountId = buyer.AccountId,
                };
                await _cartRepository.AddToCartAsync(cartItem);
                return new
                {
                    Message = "Add To Cart Successful",
                    StatusCode = 201,
                    Item = new
                    {
                        cartItem.FlowerId,
                        flower.FlowerName,
                        cartItem.Quantity,
                        cartItem.PaidPrice,
                        UnitPrice = flower.Price,
                    }
                };
            }


        }
        public async Task<dynamic> DeleteCartItemAsync(string cartItemId)
        {
            var cartItem = await _cartRepository.GetCartByOrderDetailId(cartItemId);
            if (cartItem == null)
            {
                return new
                {
                    Message = "This cart is null",
                    StatusCode = 404
                };
            }
            var result = await _cartRepository.DeleteCartAsync(cartItem);
            return result;
        }

        public async Task<dynamic> UpdateCartAsync(string cartItemId, double quantity)
        {
            var existCartItem = await _cartRepository.GetCartItemByCartIdAsync(cartItemId);
            if (existCartItem == null)
            {
                return new
                {
                    Message = "This cart is null",
                    StatusCode = 404
                };
            }
            var flowerInCart = await _productRepository.GetFlowerByFlowerIdAsync(existCartItem.FlowerId);
            if (flowerInCart == null)
            {
                return new
                {
                    Message = "Flower is not already exist",
                    StatusCode = 404
                };
            }

            if (quantity == 0)
            {
                return new
                {
                    Message = "This cart item will be delete",
                    StatusCode = 409
                };
            }
            else if (quantity > existCartItem.Quantity)
            {
                return new
                {
                    Message = $"Exceed the total number of flowers in stock",
                    StatusCode = 409
                };
            }
            existCartItem.Quantity = existCartItem.Quantity + quantity;
            existCartItem.PaidPrice = flowerInCart.Price * existCartItem.Quantity;
            var result = await _cartRepository.UpdateCartAsync(existCartItem);
            return new
            {
                Message = "Update To Cart Successful",
                StatusCode = 201,
                Item = new
                {
                    existCartItem.FlowerId,
                    existCartItem.Quantity,
                    existCartItem.PaidPrice,
                    flowerInCart.FlowerName,
                    UnitPrice = flowerInCart.Price,
                }
            };
        }

        // original
        //public async Task<dynamic> GetCartListAsync(string accessToken)
        //{
        //    string accEmail = TokenDecoder.GetEmailFromToken(accessToken);
        //    var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
        //    var result = await _cartRepository.GetListCartOfUser(acc.AccountId);
        //    return result;
        //}

        // 1
        //public async Task<dynamic> GetCartListAsync(string accessToken)
        //{
        //    string accEmail = TokenDecoder.GetEmailFromToken(accessToken);
        //    var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
        //    var listCart = await _cartRepository.GetListCartOfUser(acc.AccountId);
        //    var orders = await _orderRepository.GetListOrderNotPaymentByAccountIdAsync(acc.AccountId);
        //    //List<List<CartListDTO>> list = new()
        //    //{

        //    //};
        //    var groupedOrders = new List<List<CartListDTO>>();
        //    var shopOrderDetailsMap = new Dictionary<string, List<CartListDTO>>(); // Grouping by shop

        //    foreach (var cartItem in orders)
        //    {
        //        var orderDetails = listCart.Where(cart => cart.OrderId == cartItem.OrderId).ToList();
        //        foreach (var detail in orderDetails)
        //        {
        //            var flower = await _productRepository.GetFlowerByFlowerIdAsync(detail.FlowerId);
        //            if (flower != null)
        //            {
        //                string accId = flower.AccountId;
        //                detail.FlowerName = flower.FlowerName;
        //                // Group order details by shop (implicitly using AccountId)
        //                if (!shopOrderDetailsMap.ContainsKey(accId)) // Use AccountId as the key
        //                {
        //                    shopOrderDetailsMap[accId] = new List<CartListDTO>();
        //                }
        //                shopOrderDetailsMap[accId].Add(detail); // Add detail to the corresponding shop
        //            }
        //        }
        //    }

        //    // Convert the mapping to a list of lists for the response
        //    groupedOrders = shopOrderDetailsMap.Values.ToList();

        //    return groupedOrders;
        //}


        // 2
        //public async Task<dynamic> GetCartListAsync(string accessToken)
        //{
        //    string accEmail = TokenDecoder.GetEmailFromToken(accessToken);
        //    var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
        //    var listCart = await _cartRepository.GetListCartOfUser(acc.AccountId);
        //    var orders = await _orderRepository.GetListOrderNotPaymentByAccountIdAsync(acc.AccountId);
        //    List<CartItemViewDTO> list = new()
        //    {
        //    };
        //    foreach (var item in orders)
        //    {
        //        var cartItem = new CartItemViewDTO();
        //        var listDetails = new List<OrderDetailResponse>();
        //        var orderDetails = listCart
        //                        .Where(cart => cart.OrderId == item.OrderId)
        //                        .ToList();
        //        foreach (var detail in orderDetails)
        //        {
        //            listDetails.Add(new OrderDetailResponse()
        //            {
        //                OrderDetailId = detail.OrderDetailId,
        //                OrderId = item.OrderId,
        //                OrderNumber = detail.OrderNumber,
        //                PaidPrice = detail.PaidPrice,
        //                Quantity = detail.Quantity,
        //                Flower = await _productRepository.GetFlowerByFlowerIdAsync(detail.FlowerId)
        //            });
        //        }
        //        cartItem.OrderDetails = listDetails;
        //        cartItem.Seller = await _sellerRepository.GetShopDetailByAccountId(item.SellerId);
        //        list.Add(cartItem);
        //    }
        //    return list;
        //}

        // 3
        public async Task<dynamic> GetCartListAsync(string accessToken)
        {
            string accEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
            var listCart = await _cartRepository.GetListCartOfUser(acc.AccountId);
            var orders = await _orderRepository.GetListOrderNotPaymentByAccountIdAsync(acc.AccountId);
            List<CartItemViewDTO> list = new()
            {
            };
            foreach (var item in orders)
            {
                var cartItem = new CartItemViewDTO();
                var listDetails = new List<OrderDetailResponse>();
                var orderDetails = listCart
                                .Where(cart => cart.OrderId == item.OrderId)
                                .ToList();
                foreach (var detail in orderDetails)
                {
                    listDetails.Add(new OrderDetailResponse()
                    {
                        OrderDetailId = detail.OrderDetailId,
                        OrderId = item.OrderId,
                        OrderNumber = detail.OrderNumber,
                        PaidPrice = detail.PaidPrice,
                        Quantity = detail.Quantity,
                        Flower = await _productRepository.GetFlowerByFlowerIdAsync(detail.FlowerId)
                    });
                }
                cartItem.OrderDetails = listDetails;
                var seller = await _sellerRepository.GetShopDetailByAccountId(accountId: item.SellerId);
                cartItem.Seller = new SellerInCartDTO()
                {
                    SellerAvatar = seller.SellerAvatar,
                    ShopName = seller.ShopName
                };
                list.Add(cartItem);
            }
            return list;
        }
    }
}
