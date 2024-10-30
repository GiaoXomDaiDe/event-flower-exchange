using Net.payOS.Types;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IPaymentService
    {
        public Task<CreatePaymentResult> CreatePaymentLink(string orderId, string userId);
        public Task SuccessPayment(string transactionId);
        public Task FailedPayment(string transactionId);
    }
}
