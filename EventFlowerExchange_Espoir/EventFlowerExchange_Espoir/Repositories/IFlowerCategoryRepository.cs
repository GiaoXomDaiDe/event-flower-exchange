using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IFlowerCategoryRepository
    {
        public Task<FlowerCate> GetFlowerCateByCateIdAsync(string cateId);
        public Task<string> GetLatestFlowerCateIdAsync();
        public Task<dynamic> CreateFlowerCateAsync(FlowerCate cate);
        public Task<dynamic> UpdateFlowerCategoryAsync(FlowerCate cate);
    }
}