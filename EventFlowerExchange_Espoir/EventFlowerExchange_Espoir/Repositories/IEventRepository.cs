using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync(); // Retrieve all active events
        Task<Event> GetByIdAsync(String id);       // Get event by its ID
        Task<IEnumerable<Event>> GetBySellerAsync(string createBy); // Get events for a specific seller
        Task<Event> CreateAsync(Event eventItem); // Create new event
        Task UpdateAsync(Event eventItem);      // Update existing event
        Task DeleteAsync(String id);               // Soft-delete (deactivate) event
    }
}
