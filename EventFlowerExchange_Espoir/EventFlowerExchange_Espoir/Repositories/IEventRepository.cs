using EventFlowerExchange_Espoir.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventRepository
    {
        // Retrieve an event by its ID
        Task<Event> GetEventByEventIdAsync(string eventId);
        public Task<Event> GetEventDetailByEventIdAsync(string eventId);
        // Retrieve the latest event ID
        Task<string> GetLatestEventIdAsync();

        // Create a new event
        Task<dynamic> CreateEventAsync(Event newEvent);

        // Update an existing event
        Task<dynamic> UpdateEventAsync(Event eventToUpdate);

        // Get a list of events with pagination, sorting, and searching
        Task<(List<Event> events, int totalCount)> GetListEventAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);

        // Soft delete an event by its ID
        Task<bool> DeleteEventAsync(string eventId);
        Task<(List<Event> events, int totalCount)> GetListEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search);
        public Task<(List<Event> events, int totalCount)> GetListAllEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search);
        public Task<int> GetNumberOfPostOfEvent(string eventId);
    }
}
