using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;

namespace EventFlowerExchange_Espoir.Services
{
    public interface IAccountService
    {
        public Task<Account> GetAccountByEmailAsync(string email);
        public Task<Account> GetAccountByPhoneAsync(string phone);

        public Task<dynamic> RegisterAccountAsync(AccountDTO accountDTO);
        public Task<Account> CheckLogin(string email, string password);
        public Task<AuthResponseDTO> GetFirebaseToken(string firebaseToken);
        public string GenerateJwtToken(string email, int Role, double expirationMinutes);
        public Task<dynamic> SignUpByGoogleAsync(string firebaseToken, string phone, DateOnly birthday, string address, int gender);

        public Task<Account> GetUserAccountAsync(string accessToken);
        public Task<bool> UpdateAccountProfileByAdminAsync(string accessToken, UpdateAccountProfileDTO accountProfile);

        // for seller
        public Task<dynamic> RegisterToBeSellerAsync(SellerDTO newSeller);
    }
}
