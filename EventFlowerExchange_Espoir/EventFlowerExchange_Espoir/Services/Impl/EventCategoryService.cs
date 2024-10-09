using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;
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

        public async Task<IEnumerable<EventCategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _eventCategoryRepository.GetAllCategoriesAsync();
            return categories.Select(c => new EventCategoryDto
            {
                ECateID = c.EcateId,
                EName = c.Ename,
                EDesc = c.Edesc,
                Status = c.Status
            });
        }

        public async Task<EventCategoryDto> GetCategoryByIdAsync(int id)
        {
            var category = await _eventCategoryRepository.GetCategoryByIdAsync(id);
            if (category == null)
                return null;

            return new EventCategoryDto
            {
                ECateID = category.EcateId,
                EName = category.Ename,
                EDesc = category.Edesc,
                Status = category.Status
            };
        }

        public async Task<EventCategoryDto> CreateCategoryAsync(EventCategoryDto categoryDto)
        {
            var category = new EventCate
            {
                EcateId = categoryDto.ECateID,
                Ename = categoryDto.EName,
                Edesc = categoryDto.EDesc,
                Status = categoryDto.Status
            };

            await _eventCategoryRepository.AddCategoryAsync(category);
            return categoryDto;
        }

        public async Task UpdateCategoryAsync(int id, EventCategoryDto categoryDto)
        {
            var category = await _eventCategoryRepository.GetCategoryByIdAsync(id);
            if (category == null)
                throw new KeyNotFoundException("Category not found.");

            category.Ename = categoryDto.EName;
            category.Edesc = categoryDto.EDesc;


            await _eventCategoryRepository.UpdateCategoryAsync(category);
        }

        public async Task DeleteCategoryAsync(int id)
        {
            await _eventCategoryRepository.DeleteCategoryAsync(id);
        }
    }
}
