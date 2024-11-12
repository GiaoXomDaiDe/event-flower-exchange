using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services.Common;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IAccountRepository _accountRepository;

        public EventService(IEventRepository eventRepository, IAccountRepository accountRepository)
        {
            _eventRepository = eventRepository;
            _accountRepository = accountRepository;
        }

        public async Task<string> AutoGenerateEventId()
        {
            string newEventId = "";
            string latestEventId = await _eventRepository.GetLatestEventIdAsync();
            if (string.IsNullOrEmpty(latestEventId))
            {
                newEventId = "E000000001"; // Default value for the first event ID
            }
            else
            {
                int numericPart = int.Parse(latestEventId.Substring(1));
                int newNumericPart = numericPart + 1;
                newEventId = $"E{newNumericPart:d9}"; // Generate new event ID
            }
            return newEventId;
        }

        public async Task<dynamic> CreateNewEventAsync(string accessToken, CreateEventDTO newEvent)
        {
            try
            {
                var sellerEmail = TokenDecoder.GetEmailFromToken(accessToken);
                var seller = await _accountRepository.GetAccountByEmailAsync(sellerEmail);
                var eventEntity = new Event
                {
                    EventId = await AutoGenerateEventId(),
                    EventName = newEvent.EventName,
                    EventDesc = newEvent.EventDesc,
                    StartTime = newEvent.StartTime,
                    EndTime = newEvent.EndTime,
                    CreateBy = seller.AccountId,
                    CreateAt = DateOnly.FromDateTime(DateTime.Now),
                    EcateId = newEvent.EcateId,
                    UpdateAt = DateOnly.FromDateTime(DateTime.Now),
                    UpdateBy = seller.AccountId,
                    Status = 0 // Default status for a new event,

                };

                var result = await _eventRepository.CreateEventAsync(eventEntity);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at CreateNewEventAsync() + {ex.Message}");
            }
        }

        public async Task<dynamic> UpdateEventAsync(string accessToken, UpdateEventDTO updateEvent)
        {
            try
            {
                string ownerEmail = TokenDecoder.GetEmailFromToken(accessToken);
                var accountOwner = await _accountRepository.GetAccountByEmailAsync(ownerEmail);
                var eventEntity = await _eventRepository.GetEventByEventIdAsync(updateEvent.EventId);

                if (accountOwner == null)
                {
                    return "Account is not found or invalid token";
                }

                if (eventEntity == null)
                {
                    return "Event is not found";
                }

                if (accountOwner.AccountId != eventEntity.CreateBy)
                {
                    return "You have no permission to update this event";
                }

                eventEntity.EventName = updateEvent.EventName ?? eventEntity.EventName;
                eventEntity.EventDesc = updateEvent.EventDesc ?? eventEntity.EventDesc;
                eventEntity.StartTime = updateEvent.StartTime; // Assuming StartTime can be updated
                eventEntity.EndTime = updateEvent.EndTime; // Assuming EndTime can be updated
                eventEntity.UpdateBy = accountOwner.AccountId;
                eventEntity.UpdateAt = DateOnly.FromDateTime(DateTime.Now);

                var result = await _eventRepository.UpdateEventAsync(eventEntity);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateEventAsync() in Service: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteEventAsync(string accessToken, string eventId)
        {
            var eventEntity = await _eventRepository.GetEventByEventIdAsync(eventId);
            if (eventEntity == null)
            {
                return "Cannot find this event";
            }

            string ownerEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var owner = await _accountRepository.GetAccountByEmailAsync(ownerEmail);

            if (eventEntity.CreateBy != owner.AccountId)
            {
                return "You have no permission to delete this event";
            }

            eventEntity.Status = 1; // Mark as inactive (or implement soft delete)
            var result = await _eventRepository.UpdateEventAsync(eventEntity);
            return result;
        }

        // For viewing events
        public async Task<(List<Event> events, int totalCount)> GetListEventsAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            return await _eventRepository.GetListEventAsync(pageIndex, pageSize, sortBy, sortDesc, search);
        }
        public async Task<(List<Event> events, int totalCount)> GetListEventsOfSellerAsync(int pageIndex, int pageSize, string sellerId, string sortBy, bool sortDesc, string search)
        {
            return await _eventRepository.GetListEventsOfSellerAsync(pageIndex, pageSize, sellerId, sortBy, sortDesc, search);
        }
        public async Task<int> GetTotalPostOfEvent(string eventId)
        {
            return await _eventRepository.GetNumberOfPostOfEvent(eventId);
        }
    }
}
