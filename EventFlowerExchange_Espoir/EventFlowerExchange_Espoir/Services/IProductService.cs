﻿using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IProductService
    {
        public Task<dynamic> CreateNewFlowerAsync(string accessToken, CreateProductDTO newFlower);
        public Task<dynamic> UpdateAFlowerAsync(string accessToken, UpdateFlowerDTO updateFlower);
        public Task<dynamic> DeleteAFlowerAsync(string accessToken, string flowerId);

        public Task<(List<Flower> flowers, int totalCount)> GetListFlowerAsync(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
        public Task<(List<Flower> flowers, int totalCount)> GetListFlowerOfSeller(int pageIndex, int pageSize, string accountId, string sortBy, bool sortDesc, string search);
    }
}