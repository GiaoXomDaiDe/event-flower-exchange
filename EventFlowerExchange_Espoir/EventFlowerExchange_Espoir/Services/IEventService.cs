using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Helpers; // For PaginatedList

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventService
    {

        Task<PaginatedList<EventDto>> GetAllEventsAsync(int pageNumber, int pageSize, string sortField, string sortOrder, string searchTerm);
        Task<EventDto> GetEventByIdAsync(string id);
        Task<EventDto> CreateEventAsync(EventDto eventDto);
        Task UpdateEventAsync(string id, EventDto eventDto);
        Task DeleteEventAsync(string id);
    }
}