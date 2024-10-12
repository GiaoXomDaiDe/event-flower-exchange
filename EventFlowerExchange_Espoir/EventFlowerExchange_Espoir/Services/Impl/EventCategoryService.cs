using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Helpers;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class EventCategoryService : IEventCategoryService
    {
        private readonly IEventCategoryRepository _eventCategoryRepository;

        public EventCategoryService(IEventCategoryRepository eventCategoryRepository)
        {
            _eventCategoryRepository = eventCategoryRepository;
        }

        public async Task<PaginatedList<EventCategoryDto>> GetAllCategoriesAsync(int pageNumber, int pageSize, string sortField, string sortOrder, string searchTerm)
        {
            var categories = await _eventCategoryRepository.GetAllAsync();
            var query = categories.AsQueryable();

            // Search functionality
            if (!string.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(c => c.Ename.Contains(searchTerm) || c.Edesc.Contains(searchTerm));
            }

            // Sorting functionality
            switch (sortField?.ToLower())
            {
                case "ename":
                    query = sortOrder == "desc" ? query.OrderByDescending(c => c.Ename) : query.OrderBy(c => c.Ename);
                    break;
                case "edesc":
                    query = sortOrder == "desc" ? query.OrderByDescending(c => c.Edesc) : query.OrderBy(c => c.Edesc);
                    break;
                default:
                    query = query.OrderBy(c => c.Ename); // Default sorting by name
                    break;
            }

            // Pagination
            var totalItems = query.Count();
            var pagedCategories = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var categoryDtos = pagedCategories.Select(c => new EventCategoryDto
            {
                EcateId = c.EcateId,
                Ename = c.Ename,
                Edesc = c.Edesc,
                Status = c.Status  // Maps to IsActive
            }).ToList();

            return new PaginatedList<EventCategoryDto>(categoryDtos, totalItems, pageNumber, pageSize);
        }

        public async Task<EventCategoryDto> GetCategoryByIdAsync(string id)
        {
            var category = await _eventCategoryRepository.GetByIdAsync(id);
            if (category == null)
                return null;

            return new EventCategoryDto
            {
                EcateId = category.EcateId,
                Ename = category.Ename,
                Edesc = category.Edesc,
                Status = category.Status
            };
        }

        public async Task<EventCategoryDto> CreateCategoryAsync(EventCategoryDto categoryDto)
        {
            var category = new EventCate
            {
                EcateId = categoryDto.EcateId,
                Ename = categoryDto.Ename,
                Edesc = categoryDto.Edesc,
                Status = "active"
            };

            await _eventCategoryRepository.CreateAsync(category);
            return categoryDto;
        }

        public async Task UpdateCategoryAsync(string id, EventCategoryDto categoryDto)
        {
            var category = await _eventCategoryRepository.GetByIdAsync(id);
            if (category == null)
                throw new KeyNotFoundException("Category not found.");

            category.Ename = categoryDto.Ename;
            category.Edesc = categoryDto.Edesc;
            category.Status = categoryDto.Status;

            await _eventCategoryRepository.UpdateAsync(category);
        }

        public async Task DeleteCategoryAsync(string id)
        {
            var category = await _eventCategoryRepository.GetByIdAsync(id);
            if (category != null)
            {
                category.Status = "inactive";  // Deactivate the category
                await _eventCategoryRepository.UpdateAsync(category);
            }
        }
    }
}
