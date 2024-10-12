using System.Threading.Tasks;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Helpers;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventCategoryService
    {
        Task<PaginatedList<EventCategoryDto>> GetAllCategoriesAsync(int pageNumber, int pageSize, string sortField, string sortOrder, string searchTerm);
        Task<EventCategoryDto> GetCategoryByIdAsync(string id);
        Task<EventCategoryDto> CreateCategoryAsync(EventCategoryDto categoryDto);
        Task UpdateCategoryAsync(string id, EventCategoryDto categoryDto);
        Task DeleteCategoryAsync(string id);
    }
}
