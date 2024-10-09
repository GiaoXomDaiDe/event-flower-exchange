using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventCategoryService
    {
        Task<IEnumerable<EventCategoryDto>> GetAllCategoriesAsync();
        Task<EventCategoryDto> GetCategoryByIdAsync(int id);
        Task<EventCategoryDto> CreateCategoryAsync(EventCategoryDto categoryDto);
        Task UpdateCategoryAsync(int id, EventCategoryDto categoryDto);
        Task DeleteCategoryAsync(int id);
    }
}
