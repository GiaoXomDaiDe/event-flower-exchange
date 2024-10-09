using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IProductRepository
    {
        public Task<string> GetLatestFlowerIdAsync();
        public Task<dynamic> CreateFlower(Flower newFlower);
    }
}
