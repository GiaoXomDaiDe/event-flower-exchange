using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IProductRepository
    {
        public Task<Flower> GetFlowerByFlowerIdAsync(string flowerId);
        public Task<string> GetLatestFlowerIdAsync();

        public Task<dynamic> CreateFlowerAsync(Flower newFlower);
        public Task<dynamic> UpdateFlowerAsync(Flower flower);
        public Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
        public Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
    }
}
