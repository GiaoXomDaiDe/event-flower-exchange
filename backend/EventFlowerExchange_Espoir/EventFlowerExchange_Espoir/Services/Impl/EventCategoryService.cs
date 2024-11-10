using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class EventCategoryService : IEventCategoryService
    {
        private readonly IEventCategoryRepository _eventCategoryRepository;

        public EventCategoryService(IEventCategoryRepository eventCategoryRepository)
        {
            _eventCategoryRepository = eventCategoryRepository;
        }

        public async Task<string> AutoGenerateEventCateId()
        {
            string newCateId = "";
            string latestEventCateId = await _eventCategoryRepository.GetLatestEventCateIdAsync();
            if (string.IsNullOrEmpty(latestEventCateId))
            {
                newCateId = "EC00000001"; // Default value for the first category ID
            }
            else
            {
                int numericPart = int.Parse(latestEventCateId.Substring(2));
                int newNumericPart = numericPart + 1;
                newCateId = $"EC{newNumericPart:d8}"; // Generate new category ID
            }
            return newCateId;
        }

        public async Task<dynamic> CreateNewEventCateAsync(NewEventCateDTO newCate)
        {
            var eventCate = new EventCate
            {
                EcateId = await AutoGenerateEventCateId(),
                Ename = newCate.Ename,
                Edesc = newCate.Edesc,
                Status = "active", // Default status for a new category
                Events = new List<Event>() // Initialize the Events collection
            };

            var result = await _eventCategoryRepository.CreateEventCateAsync(eventCate);
            return result;
        }

        public async Task<dynamic> UpdateExistEventCateAsync(UpdateEventCateDTO updateCate)
        {
            try
            {
                var cate = await _eventCategoryRepository.GetEventCateByCateIdAsync(updateCate.EcateId);
                if (cate == null)
                {
                    return "Cannot find this category";
                }

                // Update the properties of the EventCate
                if (!string.IsNullOrEmpty(updateCate.Ename))
                {
                    cate.Ename = updateCate.Ename;
                }

                if (!string.IsNullOrEmpty(updateCate.Edesc))
                {
                    cate.Edesc = updateCate.Edesc;
                }

                cate.Status = updateCate.Status ?? cate.Status; // Update status if provided
                cate.Events = cate.Events; // Retain current events; might implement logic if needed

                var result = await _eventCategoryRepository.UpdateEventCategoryAsync(cate);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at UpdateExistEventCateAsync() in service: {ex.Message}");
            }
        }

        public async Task<dynamic> DeleteEventCateAsync(string eventCateId)
        {
            try
            {
                var cate = await _eventCategoryRepository.GetEventCateByCateIdAsync(eventCateId);
                if (cate == null)
                {
                    return "Cannot find this category";
                }

                cate.Status = "inactive"; // Mark as inactive instead of deleting
                cate.Events.Clear(); // Optionally clear associated events if required

                var result = await _eventCategoryRepository.UpdateEventCategoryAsync(cate);
                return result;
            }
            catch (Exception ex)
            {
                throw new Exception($"Error at DeleteEventCateAsync() in service: {ex.Message}");
            }
        }
    }   
}
