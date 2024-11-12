using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using System.Threading.Tasks;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IEventCategoryService
    {
        // Create a new Event Category
        public Task<dynamic> CreateNewEventCateAsync(NewEventCateDTO newCate);

        // Update an existing Event Category
        public Task<dynamic> UpdateExistEventCateAsync(UpdateEventCateDTO updateCate);

        // Delete an Event Category
        public Task<dynamic> DeleteEventCateAsync(string eventCateId);

        public Task<dynamic> GetListEventCategory();
    }
}
