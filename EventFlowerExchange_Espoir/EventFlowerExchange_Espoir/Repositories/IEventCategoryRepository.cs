using EventFlowerExchange_Espoir.Models;
using System.Threading.Tasks;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventCategoryRepository
    {
        // Retrieve an EventCategory by its category ID
        Task<EventCate> GetEventCateByCateIdAsync(string cateId);

        // Retrieve the latest EventCategory ID
        Task<string> GetLatestEventCateIdAsync();

        // Create a new EventCategory
        Task<dynamic> CreateEventCateAsync(EventCate category);

        // Update an existing EventCategory
        Task<dynamic> UpdateEventCategoryAsync(EventCate category);

        // Optional: Add a method to delete an EventCategory (soft delete)
        Task<bool> DeleteEventCateAsync(string cateId);
    }
}
