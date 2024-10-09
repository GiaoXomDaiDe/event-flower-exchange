using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services.Common;
using FirebaseAdmin.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountReposiotry;
        private readonly IConfiguration _configuration;
        public AccountService(IAccountRepository accountReposiotry, IConfiguration configuration)
        {
            _accountReposiotry = accountReposiotry;
            _configuration = configuration;
        }

        public async Task<Account> GetAccountByEmailAsync(string email)
        {
            return await _accountReposiotry.GetAccountByEmailAsync(email);
        }
        public async Task<Account> GetAccountByPhoneAsync(string phone)
        {
            return await _accountReposiotry.GetAccountByPhoneAsync(phone);
        }
        public async Task<string> AutoGenerateAccountId()
        {
            string newuserid = "";
            string latestUserId = await _accountReposiotry.GetLatestAccountIdAsync();
            if (string.IsNullOrEmpty(latestUserId))
            {
                newuserid = "AC00000001";
            }
            else
            {
                int numericpart = int.Parse(latestUserId.Substring(2)); 
                int newnumericpart = numericpart + 1;
                newuserid = $"AC{newnumericpart:d8}";
            }
            return newuserid;
        }

        // FOR REGISTER
        public async Task<dynamic> RegisterAccountAsync(AccountDTO accountDTO)
        {
            try
            {
                var acc = new Account
                {
                    AccountId = await AutoGenerateAccountId(),
                    Email = accountDTO.Email,
                    Password = Encryption.Encrypt(accountDTO.Password),
                    IsEmailConfirm = 1,
                    Role = 2,
                    FullName = accountDTO.Fullname,
                    Username = accountDTO.Username,
                    PhoneNumber = accountDTO.Phone,
                    Birthday = accountDTO.Birthday,
                    Address = accountDTO.Address,
                    Gender = accountDTO.Gender,
                    Status = 0
                    //Status = 0
                };
                // Save the acc
                int result = await _accountReposiotry.CreateAccountAsync(acc);

                // Generate JWT token
                var token = GenerateJwtToken(accountDTO.Email, 2, 5);

                // Send the confirmation email

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        // FOR LOGIN
        public async Task<Account> CheckLogin(string email, string password)
        {
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            bool isPasswordValid = Encryption.VerifyPassword(password, acc.Password);
            if (isPasswordValid)
            {
                return acc;
            }
            else
            {
                throw new UnauthorizedAccessException("Invalid  password");
            }
        }



        // FOR SIGN-IN BY GOOGLE
        public async Task<AuthResponseDTO> GetFirebaseToken(string firebaseToken)
        {
            try
            {
                FirebaseToken decryptedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(firebaseToken);

                string uId = decryptedToken.Uid;
                // get the acc id of the acc which is the token belongs to
                UserRecord record = await FirebaseAuth.DefaultInstance.GetUserAsync(uId); // get information of the acc that has this uId
                string email = record.Email;
                string fullName = record.DisplayName;

                Account acc = await _accountReposiotry.GetAccountByEmailAsync(email);

                AuthResponseDTO response = new()
                {
                    Email = email,
                    FullName = fullName
                };

                if (acc == null)
                {
                    throw new Exception("This account doesn't exist. Please register to gain access to our website.");
                }
                else if (acc.Email != null && acc.Password == "GOOGLE_SIGNIN")
                {
                    if (acc.FullName == null && acc.Birthday == null && acc.Address == null && acc.PhoneNumber == null)
                    {
                        throw new Exception("This account cannot sign in by google. Try another method.");

                    }
                    //throw new Exception("Login successfull!");
                }
                List<Claim> authClaims = new List<Claim>
                {
                    //new Claim("UserId", acc.UserId),
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Name, fullName),
                };
                //var token = TokenHelper.Instance.CreateToken(authClaims, _configuration);
                var token = GenerateJwtToken(email, 2, 30);
                response.Token = token;
                response.Role = acc.Role;
                return response;

            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }

        public string GenerateJwtToken(string email, int Role, double expirationMinutes)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            // add role to author
            var role = Role switch
            {
                1 => "Admin",
                2 => "User",
                3 => "Delivery"
            };
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role)// claim role
            };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(expirationMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // FOR SIGN-UP BY GOOGLE
        public async Task<dynamic> SignUpByGoogleAsync(string firebaseToken, string phone, DateOnly birthday, string address, int gender)
        {
            try
            {
                FirebaseToken decryptedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(firebaseToken);
                string uId = decryptedToken.Uid;

                UserRecord record = await FirebaseAuth.DefaultInstance.GetUserAsync(uId);
                string email = record.Email;
                string fullName = record.DisplayName;

                Account acc = await _accountReposiotry.GetAccountByEmailAsync(email);

                if (acc != null)
                {
                    throw new Exception("This account is already registered.");
                }

                acc = new Account
                {
                    AccountId = await AutoGenerateAccountId(),
                    Email= email,
                    Password = "GOOGLE_SIGNIN",
                    FullName = fullName,
                    Username = fullName,
                    PhoneNumber = phone,
                    Birthday = birthday,
                    Address = address,
                    Gender = gender,
                    Status = 0,
                    Role = 2,
                };

                await _accountReposiotry.CreateAccountAsync(acc);

                AuthResponseDTO authResponse = new()
                {
                    Email = email,
                    FullName = fullName,
                    Role = acc.Role,
                };

                List<Claim> authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Name, fullName),
        };
                var token = GenerateJwtToken(email, 2, 60);
                authResponse.Token = token;
                authResponse.Role = acc.Role;

                return authResponse;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message, e);
            }
        }


    }
}
