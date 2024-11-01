using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IProductService
    {
        public Task<dynamic> CreateNewFlowerAsync(string accessToken, CreateProductDTO newFlower);
        public Task<dynamic> UpdateAFlowerAsync(string accessToken, UpdateFlowerDTO updateFlower);
        public Task<dynamic> DeleteAFlowerAsync(string accessToken, string flowerId);
        public Task<dynamic> InactiveAndActiveFlowerBySeller(string accessToken, string flowerId);

        public Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
        public Task<(List<FlowerListDTO> flowers, int totalCount, int totalPages)> GetListFlowerOfSellerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
        public Task<dynamic> ViewFlowerDetailAsync(string flowerId);
        public Task<List<Flower>> GetAllFlowersActive();

    }
}
