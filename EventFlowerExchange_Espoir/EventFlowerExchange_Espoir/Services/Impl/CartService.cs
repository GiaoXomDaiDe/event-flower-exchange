using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services.Common;
using Microsoft.EntityFrameworkCore;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IProductRepository _productRepository;
        public CartService(ICartRepository cartRepository, IAccountRepository accountRepository, IProductRepository productRepository)
        {
            _cartRepository = cartRepository;
            _accountRepository = accountRepository;
            _productRepository = productRepository;
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
            var flower = await _productRepository.GetFlowerByFlowerNameAsync(cartDTO.FlowerName);
            if (flower == null)
            {
                return new
                {
                    Message = "Flower is not already exist",
                    StatusCode = 404
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
                        existProductInCart.Quantity,
                        existProductInCart.PaidPrice,
                        UnitPrice = flower.Price,
                    }
                };
            } else
            {
                var cartItem = new OrderDetail
                {
                    OrderDetailId = await AutoGenerateOrderDetailId(),
                    OrderId = null,
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
                }
            };
        }

        public async Task<dynamic> GetCartAsync(string accessToken)
        {
            string accEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
            var result = await _cartRepository.GetListCartOfUser(acc.AccountId);
            return result;
        }
    }
}
