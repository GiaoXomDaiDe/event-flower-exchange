using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IProductRepository
    {
        public Task<Flower> GetFlowerByFlowerIdAsync(string flowerId);
        public Task<string> GetLatestFlowerIdAsync();

        public Task<dynamic> CreateFlowerAsync(Flower newFlower);
        public Task<dynamic> UpdateFlowerAsync(Flower flower);

        public Task<(List<Flower> flowers, int totalCount)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
        public Task<(List<Flower> flowers, int totalCount)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string accountId, string sortBy, bool sortDesc, string search);
    }
}
