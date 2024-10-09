using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventCategoryRepository
    {
        Task<IEnumerable<EventCate>> GetAllCategoriesAsync();
        Task<EventCate> GetCategoryByIdAsync(int categoryId);
        Task<EventCate> AddCategoryAsync(EventCate category);
        Task UpdateCategoryAsync(EventCate category);
        Task DeleteCategoryAsync(int categoryId);
    }
}
