using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IFlowerTagService
    {
        public Task<FlowerTag> GetTagByTagNameAsync(string tagName);
        public Task<FlowerTag> GetTagByTagIdAsync(string tagId);
        public Task<string> AutoGenerateFlowerTagId();
        public Task<dynamic> CreateTagAsync(string tagName);
        public Task<dynamic> EditTagAsync(string tagName);
        public Task<dynamic> DeleteTagAsync(string tagName);

    }
}
