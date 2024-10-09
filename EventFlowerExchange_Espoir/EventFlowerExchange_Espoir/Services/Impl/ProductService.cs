using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;
using EventFlowerExchange_Espoir.Services.Common;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IAccountRepository _accountRepository;

        public ProductService(IProductRepository productRepository, IAccountRepository accountRepository)
        {
            _productRepository = productRepository;
            _accountRepository = accountRepository;
        }

        public async Task<string> AutoGenerateFlowerId()
        {
            string newFlowerId = "";
            string latestUserId = await _productRepository.GetLatestFlowerIdAsync();
            if (string.IsNullOrEmpty(latestUserId))
            {
                newFlowerId = "F000000001";
            }
            else
            {
                int numericpart = int.Parse(latestUserId.Substring(1));
                int newnumericpart = numericpart + 1;
                newFlowerId = $"F{newnumericpart:d9}";
            }
            return newFlowerId;
        }
        public async Task<dynamic> CreateNewFlowerAsync(string accessToken, CreateProductDTO newFlower)
        {
            try
            {
                var sellerEmail = TokenDecoder.GetEmailFromToken(accessToken);
                var seller = await _accountRepository.GetAccountByEmailAsync(sellerEmail);
                if(newFlower.OldPrice == 0)
                {
                    newFlower.OldPrice = newFlower.OldPrice;
                }
                if (newFlower.TagId == null)
                {
                    newFlower.TagId = "Empty";
                }
                var flower = new Flower
                {
                    FlowerId = await AutoGenerateFlowerId(),
                    FlowerName = newFlower.FlowerName,
                    CateId = newFlower.CateId,
                    Description = newFlower.Description,
                    Size = newFlower.Size,// tổng kích thước hoa có sẵn
                    Quantity = newFlower.Quantity,// tổng số lượng hoa có 
                    Condition = newFlower.Condition,
                    Price = newFlower.Price,
                    OldPrice = newFlower.OldPrice,
                    AccountId = seller.AccountId,
                    CreatedAt = DateOnly.FromDateTime(DateTime.Now),
                    DateExpiration = newFlower.DateExpiration,
                    Status = 0,
                    TagId = newFlower.TagId,
                    Attachment = "null",//thêm blob storage sau
                };

                int result = await _productRepository.CreateFlower(flower);

                return result;
            } catch (Exception ex)
            {
                throw new Exception($"Error at CreateNewFlowerAsync() + {ex.Message}");
            }

        }
    }
}
