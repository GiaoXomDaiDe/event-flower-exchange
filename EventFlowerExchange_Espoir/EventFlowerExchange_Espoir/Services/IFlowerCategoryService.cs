using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IFlowerCategoryService
    {
        public Task<dynamic> CreateNewFCateAsync(NewFCateDTO newCate);
        public Task<dynamic> UpdateExistFCateAsync(UpdateFCateDTO updateCate);
        public Task<dynamic> DeleteFCateAsync(string fCateId);
        public Task<List<FlowerCate>> GetListCategoryOfFlowerAsync();
    }
}
