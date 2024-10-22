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
                if (newFlower.OldPrice == 0)
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
                    TagIds = newFlower.TagIds,
                    Attachment = "Empty",//thêm blob storage sau
                };

                var result = await _productRepository.CreateFlowerAsync(flower);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at CreateNewFlowerAsync() + {ex.Message}");
            }
        }

        public async Task<dynamic> UpdateAFlowerAsync(string accessToken, UpdateFlowerDTO updateFlower)
        {
            try
            {
                // Determine the seller
                string ownerEmail = TokenDecoder.GetEmailFromToken(accessToken);
                var accOwner = await _accountRepository.GetAccountByEmailAsync(ownerEmail);
                if (accOwner == null)
                {
                    return "Account is not found or invalid token";
                }
                // Check the exist of flower
                var flower = await _productRepository.GetFlowerByFlowerIdAsync(updateFlower.FlowerId);
                if (flower == null)
                {
                    return "Flower is not found";
                }
                // Determine the seller's ownership of flowers
                if (accOwner.AccountId != flower.AccountId)
                {
                    return "You have no permission to update this flower";
                }

                // Validation all field of update flower and update flower
                if (!string.IsNullOrEmpty(updateFlower.FlowerName))
                {
                    updateFlower.FlowerName = flower.FlowerName;
                }
                flower.FlowerName = updateFlower.FlowerName;

                if (!string.IsNullOrEmpty(updateFlower.CateId))
                {
                    updateFlower.CateId = flower.CateId;
                }
                flower.CateId = updateFlower.CateId;

                if (!string.IsNullOrEmpty(updateFlower.Description))
                {
                    updateFlower.Description = flower.Description;
                }
                flower.Description = updateFlower.Description;

                if (!string.IsNullOrEmpty(updateFlower.Size))
                {
                    updateFlower.Size = flower.Size;
                }
                flower.Size = updateFlower.Size;

                if (!string.IsNullOrEmpty(updateFlower.Condition))
                {
                    updateFlower.Condition = flower.Condition;
                }
                flower.Condition = updateFlower.Condition;

                if (updateFlower.Quantity == 0)
                {
                    updateFlower.Quantity = flower.Quantity;
                }
                flower.Quantity = updateFlower.Quantity;

                if (updateFlower.OldPrice == 0)
                {
                    updateFlower.OldPrice = flower.OldPrice;
                }
                if (updateFlower.Discount == 0)
                {
                    updateFlower.OldPrice = flower.OldPrice;
                }
                flower.Price = updateFlower.OldPrice * (1 -  updateFlower.Discount/100);
                if (string.IsNullOrEmpty(updateFlower.DateExpiration))
                {
                    updateFlower.DateExpiration = flower.DateExpiration;
                }
                flower.DateExpiration = updateFlower.DateExpiration;
                if (!string.IsNullOrEmpty(updateFlower.DateExpiration))
                {
                    updateFlower.DateExpiration = flower.DateExpiration;
                }
                flower.UpdateBy = accOwner.AccountId;
                flower.UpdateAt = DateTime.Now;
                int result = await _productRepository.UpdateFlowerAsync(flower);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateAFlowerAsync() in Service: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteAFlowerAsync(string accessToken, string flowerId)
        {
            var flower = await _productRepository.GetFlowerByFlowerIdAsync(flowerId);
            if (flower != null)
            {
                return "Cannot find this flower";
            }
            string ownerEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var owner = await _accountRepository.GetAccountByEmailAsync(ownerEmail);

            if (flower.AccountId != owner.AccountId)
            {
                return "You have no permission to delete this flower";
            }
            flower.IsDeleted = 1;
            int result = await _productRepository.UpdateFlowerAsync(flower);
            return result;
        }


        // FOR VIEW PRODUCT
        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            return await _productRepository.GetListFlowerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
        }

        public async Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            return await _productRepository.GetListFlowerOfSellerAsync(pageIndex, pageSize, sortBy, sortDesc, search);
        }
    }
}
