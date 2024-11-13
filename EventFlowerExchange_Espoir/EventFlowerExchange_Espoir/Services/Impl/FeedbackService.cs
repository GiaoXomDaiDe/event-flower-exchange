using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Repositories.Impl;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _feedbackRepository;
        private readonly IAccountRepository _accountRepository;

        public FeedbackService(IFeedbackRepository feedbackRepository, IAccountRepository accountRepository)
        {
            _feedbackRepository = feedbackRepository;
            _accountRepository = accountRepository;
        }

        public async Task<string> AutoGenerateFeedbackId()
        {
            string newFeedbackId = "";
            string latestFeedbackId = await _feedbackRepository.GetLatestFeedbackIdAsync();
            if (string.IsNullOrEmpty(latestFeedbackId))
            {
                newFeedbackId = "FB00000001";
            }
            else
            {
                int numericpart = int.Parse(latestFeedbackId.Substring(2));
                int newnumericpart = numericpart + 1;
                newFeedbackId = $"FB{newnumericpart:d8}";
            }
            return newFeedbackId;
        }
        public async Task<dynamic> CreateFeedbackAsync(string accEmail, CreateFeedbackDTO feedbackDTO)
        {
            var acc = await _accountRepository.GetAccountByEmailAsync(accEmail);
            if (acc == null)
            {
                return new
                {
                    Message = "This account is not already exist",
                    Status = 404
                };
            }
            if (feedbackDTO.Rating == 5)
            {
                feedbackDTO.Detail = "Excellent";
            }
            else if (feedbackDTO.Rating == 4)
            {
                feedbackDTO.Detail = "Good";
            }
            else if (feedbackDTO.Rating == 3)
            {
                feedbackDTO.Detail = "Normal";
            }
            else if (feedbackDTO.Rating == 2)
            {
                feedbackDTO.Detail = "Not Satisfied";
            }
            else if (feedbackDTO.Rating == 1)
            {
                feedbackDTO.Detail = "Bad";
            }

            if (feedbackDTO.Rating >= 4)
            {
                feedbackDTO.IsGoodReview = true;
            } else
            {
                feedbackDTO.IsGoodReview = false;
            }
            var feedback = new Feedback
            {
                FeedbackId = await AutoGenerateFeedbackId(),
                Detail = feedbackDTO.Detail,
                Rating = feedbackDTO.Rating,
                Attachment = "Empty",
                AccountId = acc.AccountId,
                CreateDate = DateOnly.FromDateTime(DateTime.Now),
                IsGoodReview = feedbackDTO.IsGoodReview
            };
            var result = await _feedbackRepository.AddFeedbackAsync(feedback);
            return new
            {
                result,
                Message = "Create Feedback Successfull",
                Feedback = new
                {
                    feedback.FeedbackId,
                    feedback.Detail,
                    feedback.Rating,
                    feedback.AccountId,
                    feedback.CreateDate,
                    feedback.IsGoodReview,
                }
            };
        }
        public async Task<(List<FeedbacksDTO> Feebacks, int TotalCount, int TotalPages)> GetListFeedbackOfProduct(int pageIndex, int pageSize, string sortBy, bool sortDesc, string search)
        {
            return await _feedbackRepository.GetListFeedbackOfProduct(pageIndex, pageSize, sortBy, sortDesc, search);
        }
    }
}
