using EventFlowerExchange_Espoir.DatabaseConnection;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Models;

namespace EventFlowerExchange_Espoir.Repositories
{
    public interface IFeedbackRepository
    {
        public Task<Feedback> GetFeedbackByIdAsync(string feedbackId);
        public Task<List<ListFeedbackDTO>> GetListOfFeedbackAsync();
        public  Task<string> GetLatestFeedbackIdAsync();
        public Task<dynamic> AddFeedbackAsync(Feedback feedback);
        public Task<dynamic> UpdateFeedbackAsync(Feedback feedback);
        public Task<(List<FeedbacksDTO> Feebacks, int TotalCount, int TotalPages)> GetListFeedbackOfProduct(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search);
    }
}
