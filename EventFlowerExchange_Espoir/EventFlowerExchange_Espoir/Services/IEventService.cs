using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventService
    {
        Task<IEnumerable<EventDto>> GetAllEventsAsync();
        Task<EventDto> GetEventByIdAsync(string id);
        Task<EventDto> CreateEventAsync(EventDto eventDto);
        Task UpdateEventAsync(string id, EventDto eventDto);
        Task DeleteEventAsync(string id);
    }
}
