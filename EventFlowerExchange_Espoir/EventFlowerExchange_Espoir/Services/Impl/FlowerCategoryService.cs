using Azure.Core;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;
using EventFlowerExchange_Espoir.Services.Common;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class FlowerCategoryService : IFlowerCategoryService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IFlowerCategoryRepository _flowerCateRepository;

        public FlowerCategoryService(IAccountRepository accountRepository, IFlowerCategoryRepository flowerCateRepository)
        {
            _accountRepository = accountRepository;
            _flowerCateRepository = flowerCateRepository;
        }

        public async Task<string> AutoGenerateFlowerCateId()
        {
            string newuserid = "";
            string lastestFCateIds = await _flowerCateRepository.GetLatestFlowerCateIdAsync();
            if (string.IsNullOrEmpty(lastestFCateIds))
            {
                newuserid = "FC00000001";
            }
            else
            {
                int numericpart = int.Parse(lastestFCateIds.Substring(2));
                int newnumericpart = numericpart + 1;
                newuserid = $"FC{newnumericpart:d8}";
            }
            return newuserid;
        }

        public async Task<dynamic> CreateNewFCateAsync(string accessToken, NewFCateDTO newCate)
        {
            string email = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountRepository.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return new
                {
                    StatusCode = 404,
                    Message = "Your account is not exist"
                };
            }
            if (acc.IsSeller == 0 || acc.Role == 1)
            {
                return new
                {
                    Message = "You are not a seller. Please register to be a seller"
                };
            }
            if (string.IsNullOrEmpty(newCate.FparentCateId))
            {
                newCate.FparentCateId = "Empty";
            }
            var fCategory = new FlowerCate
            {
                FcateId = await AutoGenerateFlowerCateId(),
                FcateName = newCate.FcateName,
                FcateDesc = newCate.FcateDesc,
                FparentCateId = newCate.FparentCateId,
            };
            var result = await _flowerCateRepository.CreateFlowerCateAsync(fCategory);
            return new
            {
                result,
                Category = fCategory,
            };
        }

        public async Task<dynamic> UpdateExistFCateAsync(string accessToken, UpdateFCateDTO updateCate)
        {
            try
            {
                string email = TokenDecoder.GetEmailFromToken(accessToken);
                var acc = await _accountRepository.GetAccountByEmailAsync(email);
                if (acc == null)
                {
                    return new
                    {
                        StatusCode = 404,
                        Message = "Your account is not exist"
                    };
                }
                if (acc.IsSeller == 0)
                {
                    return new
                    {
                        Message = "You are not a seller. Please register to be a seller"
                    };
                }
                var cate = await _flowerCateRepository.GetFlowerCateByCateIdAsync(updateCate.FCateId);
                if (cate == null)
                {
                    return "Cannot find this category";
                }
                if (!string.IsNullOrEmpty(updateCate.FcateName))
                {
                    updateCate.FcateName = cate.FcateName;
                }
                cate.FcateName = updateCate.FcateName;

                if (!string.IsNullOrEmpty(updateCate.FcateDesc))
                {
                    updateCate.FcateDesc = cate.FcateDesc;
                }

                cate.FcateDesc = updateCate.FcateDesc;
                cate.Status = 0; // 0. active 1. inactive
                cate.IsDeleted = 0; // 0. false 1. true
                cate.FparentCateId = "null";

                var result = await _flowerCateRepository.UpdateFlowerCategoryAsync(cate);
                return result;
            } catch (Exception ex)
            {
                throw new Exception($"Error at UpdateExistFCateAsync() in service: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteFCateAsync(string accessToken, string fCateId)
        {
            try
            {
                string email = TokenDecoder.GetEmailFromToken(accessToken);
                var acc = await _accountRepository.GetAccountByEmailAsync(email);
                if (acc == null)
                {
                    return new
                    {
                        StatusCode = 404,
                        Message = "Your account is not exist"
                    };
                }
                if (acc.IsSeller == 0)
                {
                    return new
                    {
                        Message = "You are not a seller. Please register to be a seller"
                    };
                }
                var cate = await _flowerCateRepository.GetFlowerCateByCateIdAsync(fCateId);
                if (cate == null)
                {
                    return "Cannot find this category";
                }
                cate.IsDeleted = 1;
                var result = await _flowerCateRepository.UpdateFlowerCategoryAsync(cate);
                return result;
            } catch (Exception ex)
            {
                throw new Exception ($"Error at DeleteFCateAsync() in service: {ex.Message}");
            }

        }

        public async Task<List<FlowerCate>> GetListCategoryOfFlowerAsync()
        {
            var cateList = await _flowerCateRepository.GetFLowerCateListAsync();
            return cateList;
        }
    }
}
