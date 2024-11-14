using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventService
    {
        // Create a new Event
        Task<dynamic> CreateNewEventAsync(string accessToken, CreateEventDTO newEvent);

        // Update an existing Event
        Task<dynamic> UpdateEventAsync(string accessToken, UpdateEventDTO updateEvent);

        // Delete an Event
        Task<dynamic> DeleteEventAsync(string accessToken, string eventId);
        public Task<dynamic> InactiveAndActiveEventAsync(string accessToken, string eventId);

        // Get a list of Events with pagination, sorting, and searching
        Task<(List<Event> events, int totalCount)> GetListEventsAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);

        // Get a list of Events created by a specific seller
        Task<(List<Event> events, int totalCount)> GetListEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search);
        public Task<(List<Event> events, int totalCount)> GetListAllEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search);
        public Task<int> GetTotalPostOfEvent(string eventId);

        public Task<dynamic> GetEventDetailByEventIdAsync(string eventId);
    }
}
