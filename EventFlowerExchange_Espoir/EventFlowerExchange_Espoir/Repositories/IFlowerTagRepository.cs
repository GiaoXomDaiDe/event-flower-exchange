using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IFlowerTagRepository
    {
        public Task<FlowerTag> GetTagByTagName(string tagName);
        public Task<FlowerTag> GetTagByTagId(string tagId);

        public Task<string> GetLatestFlowerTagIdAsync();

        public Task<dynamic> AddTagAsync(FlowerTag tag);
        public Task<dynamic> UpdateTagAsync(FlowerTag tag);
        public Task<dynamic> DeleteTagAsync(FlowerTag tag);

    }
}
