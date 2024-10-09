using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IProductService
    {
        public Task<dynamic> CreateNewFlowerAsync(string accessToken, CreateProductDTO newFlower);

    }
}
