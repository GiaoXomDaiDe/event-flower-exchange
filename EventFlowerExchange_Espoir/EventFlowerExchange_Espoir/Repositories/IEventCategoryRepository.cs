using EventFlowerExchange_Espoir.Models;
using System.Threading.Tasks;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventCategoryRepository
    {
        // Retrieve an EventCategory by its category ID
        public Task<EventCate> GetEventCateByCateIdAsync(string cateId);

        // Retrieve the latest EventCategory ID
        public Task<string> GetLatestEventCateIdAsync();

        // Create a new EventCategory
        public Task<dynamic> CreateEventCateAsync(EventCate category);

        // Update an existing EventCategory
        public Task<dynamic> UpdateEventCategoryAsync(EventCate category);

        // Optional: Add a method to delete an EventCategory (soft delete)
        public Task<bool> DeleteEventCateAsync(string cateId);
        public Task<dynamic> GetListEventCategory();
    }
}
