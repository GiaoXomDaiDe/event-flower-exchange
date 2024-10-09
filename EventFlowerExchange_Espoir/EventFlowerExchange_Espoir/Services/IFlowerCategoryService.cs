using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IFlowerCategoryService
    {
        public Task<dynamic> CreateNewFCateAsync(NewFCateDTO newCate);
    }
}
