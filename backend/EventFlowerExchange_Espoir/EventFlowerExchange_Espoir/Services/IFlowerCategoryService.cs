using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IFlowerCategoryService
    {
        public Task<dynamic> CreateNewFCateAsync(string accessToken, NewFCateDTO newCate);
        public Task<dynamic> UpdateExistFCateAsync(string accessToken, UpdateFCateDTO updateCate);
        public Task<dynamic> DeleteFCateAsync(string accessToken, string fCateId);
        public Task<List<FlowerCate>> GetListCategoryOfFlowerAsync();
    }
}
