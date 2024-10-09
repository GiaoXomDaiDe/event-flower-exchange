using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;

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

        public async Task<dynamic> CreateNewFCateAsync(NewFCateDTO newCate)
        {
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
            return result;
        }

    }
}
