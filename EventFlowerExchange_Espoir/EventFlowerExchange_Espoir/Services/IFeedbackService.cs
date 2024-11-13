using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IFeedbackService
    {
        public Task<dynamic> CreateFeedbackAsync(string accEmail, CreateFeedbackDTO feedbackDTO);
        public Task<(List<FeedbacksDTO> Feebacks, int TotalCount, int TotalPages)> GetListFeedbackOfProduct(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
    }
}
