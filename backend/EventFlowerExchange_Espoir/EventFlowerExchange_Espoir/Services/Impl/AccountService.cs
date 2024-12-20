﻿using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Repositories;
using EventFlowerExchange_Espoir.Services.Common;
using FirebaseAdmin.Auth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace EventFlowerExchange_Espoir.Services.Impl
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountReposiotry;
        private readonly IConfiguration _configuration;
        private readonly IProductRepository _productReposiotry;
        private readonly IImageService _imageService;
        public AccountService(IAccountRepository accountReposiotry, IConfiguration configuration, IProductRepository productRepository, IImageService imageService)
        {
            _accountReposiotry = accountReposiotry;
            _configuration = configuration;
            _productReposiotry = productRepository;
            _imageService = imageService;
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
            string newAccountId = "";
            string latestAccountId = await _accountReposiotry.GetLatestAccountIdAsync();
            if (string.IsNullOrEmpty(latestAccountId))
            {
                newAccountId = "AC00000001";
            }
            else
            {
                int numericpart = int.Parse(latestAccountId.Substring(2));
                int newnumericpart = numericpart + 1;
                newAccountId = $"AC{newnumericpart:d8}";
            }
            return newAccountId;
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
                    Status = 0,
                    IsSeller = 0,
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
                    Email = email,
                    Password = "GOOGLE_SIGNIN",
                    FullName = fullName,
                    Username = fullName,
                    PhoneNumber = phone,
                    Birthday = birthday,
                    Address = address,
                    Gender = gender,
                    Status = 0,
                    Role = 2,
                    IsSeller = 0
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

        // Profile
        public async Task<Account> GetUserAccountAsync(string accessToken)
        {
            string accountEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var account = await _accountReposiotry.GetAccountByEmailAsync(accountEmail);
            return account;
        }

        public async Task<bool> UpdateAccountProfileByAdminAsync(string accessToken, UpdateAccountProfileDTO accountProfile)
        {
            var accountEmail = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(accountEmail);
            if (acc == null)
            {
                return false;
            }

            // if users do not enter any items, these items will keep the initial data in db
            if (!string.IsNullOrEmpty(accountProfile.Fullname))
            {
                acc.FullName = accountProfile.Fullname;
            }
            if (!string.IsNullOrEmpty(accountProfile.Email))
            {
                acc.Email = accountProfile.Email;
            }
            if (!string.IsNullOrEmpty(accountProfile.Username))
            {
                acc.Username = accountProfile.Username;
            }
            if (!string.IsNullOrEmpty(accountProfile.Phone))
            {
                acc.PhoneNumber = accountProfile.Phone;
            }
            if (accountProfile.Gender == 0)
            {
                acc.Gender = accountProfile.Gender;
            }
            if (!string.IsNullOrEmpty(accountProfile.Address))
            {
                acc.Address = accountProfile.Address;
            }
            return await _accountReposiotry.UpdateAccount(acc);
        }


        // for Seller
        public async Task<string> AutoGenerateUserId()
        {
            string newUserId = "";
            string latestUserId = await _accountReposiotry.GetLatestUserIdAsync();
            if (string.IsNullOrEmpty(latestUserId))
            {
                newUserId = "US00000001";
            }
            else
            {
                int numericpart = int.Parse(latestUserId.Substring(2));
                int newnumericpart = numericpart + 1;
                newUserId = $"US{newnumericpart:d8}";
            }
            return newUserId;
        }

        public async Task<dynamic> RegisterToBeSellerAsync(SellerDTO newSeller)
        {
            string email = TokenDecoder.GetEmailFromToken(newSeller.AccessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return "Account cannot be found. Please try again";
            }
            var existShop = await _accountReposiotry.GetUserByShopName(newSeller.ShopName);
            if (existShop != null)
            {
                return new
                {
                    Message = "This shop name is already exist. Please try another"
                };
            }

            var attachment = await _imageService.UploadImageAsync(newSeller.AttachmentFiles);
            if (string.IsNullOrEmpty(newSeller.SellerAddress))
            {
                newSeller.SellerAddress = acc.Address;
            }
            acc.IsSeller = 1;
            await _accountReposiotry.UpdateAccount(acc);
            var seller = new User
            {
                UserId = await AutoGenerateUserId(),
                AccountId = acc.AccountId,
                CardName = newSeller.CardName,
                CardNumber = newSeller.CardNumber,
                CardProviderName = newSeller.CardProviderName,
                TaxNumber = newSeller.TaxNumber,
                SellerAddress = newSeller.SellerAddress,
                SellerAvatar = attachment.SecureUri.AbsoluteUri,
                ShopName = newSeller.ShopName,
            };
            if (newSeller.AttachmentFiles == null)
            {
                seller.SellerAvatar = "Empty";
            }
            var result = await _accountReposiotry.CreateUserAsync(seller);

            return new
            {
                Result = result,
                Shop = seller,
                Message = "Register to be seller successful",
            };

        }
        public async Task<object> CheckSellerRole(string accessToken)
        {
            string email = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return "Account cannot be found. Please try again";
            }

            if (acc.IsSeller == 1)
            {
                return 1;
            }
            return 0;
        }
        public async Task<dynamic> CancelRoleSellerAsync(string accessToken)
        {
            string email = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return new
                {
                    Message = "Account cannot be found. Please try again"
                };
            }

            if (acc.IsSeller == 0)
            {
                return new
                {
                    Message = "This account is not a seller"
                };
            }
            acc.IsSeller = 0;
            var flowers = await _productReposiotry.GetListFlowerByAccountId(acc.AccountId);
            if (flowers != null)
            {
                await _productReposiotry.DeleteListOfFlowersAsEverAsync(flowers);
            }
            var shop = await _accountReposiotry.GetUserByAccountId(acc.AccountId);
            await _accountReposiotry.UpdateAccount(acc);
            return await _accountReposiotry.DeleteUserAsync(shop);
        }

        public async Task<dynamic> GetSellerProfileAsync(string accessToken)
        {
            string email = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return new
                {
                    StatusCode = 404,
                    Message = "Your account is not exist"
                };
            }
            if (acc.IsSeller == 0)
            {
                return new
                {
                    Message = "You are not a seller. Please register to be a seller"
                };
            }
            var user = await _accountReposiotry.GetSellerProfileByAccountIdAsync(acc.AccountId);
            return new
            {
                user
            };
        }

        public async Task<dynamic> GetPaymentInfoOfSellerAsync(string accessToken)
        {
            string email = TokenDecoder.GetEmailFromToken(accessToken);
            var acc = await _accountReposiotry.GetAccountByEmailAsync(email);
            if (acc == null)
            {
                return new
                {
                    StatusCode = 404,
                    Message = "Your account is not exist"
                };
            }
            if (acc.IsSeller == 0)
            {
                return new
                {
                    Message = "You are not a seller. Please register to be a seller"
                };
            }
            var user = await _accountReposiotry.GetBankInfoOfSellerAsync(acc.AccountId);
            return user;
        }

        public async Task<dynamic> GetListOfBankAsync()
        {
            return await _accountReposiotry.GetListBankNameAsync();
        }

        public async Task<long> GetAccountBalance(string accountEmail)
        {
            var account = await _accountReposiotry.GetAccountByEmailAsync(accountEmail);
            if (account == null)
            {
                return 0;
            }
            return await _accountReposiotry.GetAccountBalance(account.AccountId);
        }
    }
}
