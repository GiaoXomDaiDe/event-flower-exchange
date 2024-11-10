using EventFlowerExchange_Espoir.Repositories;
using Net.payOS.Types;
using Net.payOS;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class PaymentService : IPaymentService
    {
        private readonly PayOS _payOs;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IConfiguration _configuration;
        private readonly IOrderRepository _orderRepository;
        private readonly IAccountRepository _accountRepository;

        public PaymentService(IConfiguration configuration,
                    ITransactionRepository transactionRepository,
                    IOrderRepository orderRepository,
                    IAccountRepository accountRepository)
        {
            _configuration = configuration;
            _payOs = new PayOS(_configuration.GetSection("PayOS:ClientID").Value!,
                    _configuration.GetSection("PayOS:ApiKey").Value!,
                    _configuration.GetSection("PayOS:ChecksumKey").Value!);
            _transactionRepository = transactionRepository;
            _orderRepository = orderRepository;
            _accountRepository = accountRepository;
        }

        public async Task<CreatePaymentResult> CreatePaymentLink(string orderId, string userId)
        {
            //Update total money before generate payment link
            var totalMoney = await _orderRepository.GetTotalMoneyOfOrder(orderId);
            var user = await _accountRepository.GetAccountById(userId);
            var transaction = await _transactionRepository.CreateTransaction(orderId, userId);
            var listItem = new List<ItemData>()
                {
                    new ItemData("Thanh toán đơn hàng", 1, (int)totalMoney * 1000)
                };
            PaymentData paymentData = new PaymentData(Int32.Parse(transaction.TransactionId.Substring(2)), (int)totalMoney*1000,
                "Nền tảng bán hoa", listItem,
                "http://localhost:7027/checkout/fail?transactionId=" + transaction.TransactionId,
                "http://localhost:7027/checkout/success?transactionId=" + transaction.TransactionId);
            CreatePaymentResult createPaymentResult = await _payOs.createPaymentLink(paymentData);
            return createPaymentResult;
        }

        //0 - On going
        //1 - Payed success
        //2 - Cancel Payment
        public async Task FailedPayment(string transactionId)
        {
            var transaction = await _transactionRepository.GetTransactionById(transactionId);
            transaction.Status = 1;
            transaction.Date = DateOnly.FromDateTime(DateTime.Now);
            await _transactionRepository.UpdateTransaction(transaction);
        }

        public async Task SuccessPayment(string transactionId)
        {
            var transaction = await _transactionRepository.GetTransactionById(transactionId);
            transaction.Status = 1;
            transaction.Date = DateOnly.FromDateTime(DateTime.Now);
            await _transactionRepository.UpdateTransaction(transaction);
            var order = await _orderRepository.GetOrderById(transaction.OrderId);
            order.Status = 4;
            await _orderRepository.UpdateOrder(order);
        }
    }
}
