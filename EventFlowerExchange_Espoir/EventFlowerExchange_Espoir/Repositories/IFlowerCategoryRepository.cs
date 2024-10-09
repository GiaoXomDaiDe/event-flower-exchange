using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IFlowerCategoryRepository
    {
        public Task<string> GetLatestFlowerCateIdAsync();
        public Task<dynamic> CreateFlowerCateAsync(FlowerCate cate);
    }
}
