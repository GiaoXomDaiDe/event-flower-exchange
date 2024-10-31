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
        private readonly IFlowerCategoryRepository _categoryRepository;
        private readonly IImageService _imageService;

        public ProductService(IProductRepository productRepository, IAccountRepository accountRepository, IFlowerCategoryRepository categoryRepository, IImageService imageService)
        {
            _productRepository = productRepository;
            _accountRepository = accountRepository;
            _categoryRepository = categoryRepository;
            _imageService = imageService;
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

        // FOR CRUD FLOWER
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
                if (newFlower.TagIds == null)
                {
                    newFlower.TagIds = "Empty";
                }

                var attachmentUris = new List<string>();
                // Upload each attachment file
                if (newFlower.AttachmentFiles != null && newFlower.AttachmentFiles.Any())
                {
                    // Upload each file and collect its URI
                    foreach (var file in newFlower.AttachmentFiles)
                    {
                        var attachment = await _imageService.UploadImageAsync(file);
                        attachmentUris.Add(attachment.SecureUri.AbsoluteUri);
                    }
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
                    Attachment = string.Join(",", attachmentUris),//thêm blob storage sau
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
                flower.Price = updateFlower.OldPrice * (1 - updateFlower.Discount / 100);
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

        // FOR INACTIVE/ACTIVE PRODUCT BY SELLER
        public async Task<dynamic> InactiveAndActiveFlowerBySeller(string accessToken, string flowerId)
        {
            var accEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
            if (acc == null)
            {
                return new
                {
                    Message = "Cannot find this account",
                    Status = 404
                };
            }
            if (acc.IsSeller == 0)
            {
                return new
                {
                    Message = "You don't have permission to inactive flower",
                    StatusCode = 403,
                };
            }
            var flower = await _productRepository.GetFlowerByFlowerIdAsync(flowerId);
            if (flower == null)
            {
                return new
                {
                    Message = "Flower cannot be found",
                    StatusCode = 404,
                };
            }
            if (flower.Status == 0)
            {
                flower.Status = 1;
                return new
                {
                    Message = "Inactive Successful",
                    Product = flower,
                };
            }
            else if (flower.Status == 1)
            {
                flower.Status = 0;
                return new
                {
                    Message = "Active Successful",
                    Product = flower,
                };

            }
            return await _productRepository.UpdateFlowerAsync(flower);
            
        }


        // FOR VIEW PRODUCT
        public async Task<dynamic> ViewFlowerDetailAsync(string flowerId)
        {
            var flower = await _productRepository.GetFlowerByFlowerIdAsync(flowerId);
            if (flower == null)
            {
                return new
                {
                    Message = "Cannot find this flower",
                    StatusCode = 404
                };
            }
            var flowerCate = await _categoryRepository.GetFlowerCateByCateIdAsync(flower.CateId);
            var shop = await _accountRepository.GetUserByAccountIdAsync(flower.AccountId);
            var flowerInfo = new DetailFlowerDTO
            {
                FlowerId = flowerId,
                FlowerName = flower.FlowerName,
                CateName = flowerCate.FcateName,
                Description = flower.Description,
                Size = flower.Size,
                Condition = flower.Condition,
                Quantity = flower.Quantity,
                OldPrice = flower.OldPrice,
                Discount = $"{flower.Price/flower.OldPrice}",
                ShopName = shop.ShopName,
                DateExpiration = flower.DateExpiration,
                Attachment = flower.Attachment,
            };
            return flowerInfo;
        }

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
