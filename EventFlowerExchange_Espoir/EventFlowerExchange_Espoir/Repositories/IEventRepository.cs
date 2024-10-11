using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventRepository
    {
        public Task<IEnumerable<Event>> GetAllAsync(); // Retrieve all active events
        public Task<Event> GetByIdAsync(string id);     // Get event by its ID
        public Task<IEnumerable<Event>> GetBySellerAsync(string sellerId); // Get events for a specific seller
        //public Task<Event> CreateAsync(Event eventItem); // Create new event
        public Task UpdateAsync(Event eventItem);      // Update existing event
        //public Task DeleteAsync(String id);               // Soft-delete (deactivate) event
    }
}
