using System.Collections.Generic;
using System.Threading.Tasks;
using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IEventCategoryRepository
    {
        Task<IEnumerable<EventCate>> GetAllAsync();
        Task<EventCate> GetByIdAsync(string id);
        Task CreateAsync(EventCate category);
        Task UpdateAsync(EventCate category);
    }
}
