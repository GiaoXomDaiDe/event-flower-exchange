using EventFlowerExchange_Espoir.Models;
using EventFlowerExchange_Espoir.Models.DTO;
using EventFlowerExchange_Espoir.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace EventFlowerExchange_Espoir.Controllers
{
    [Route("api/account")]
    [ApiController]
    [EnableCors("AllowAllOrigins")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAccountAsync([FromForm] AccountDTO accountDTO)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var existingPhone = await _accountService.GetAccountByPhoneAsync(accountDTO.Phone);
            var existingEmail = await _accountService.GetAccountByEmailAsync(accountDTO.Email);
            if (existingEmail != null)
            {
                if (existingPhone != null)
                {
                    return BadRequest(new { Errors = new List<string> { "Email and Phone is already in use." } });
                }
                else return BadRequest(new { Errors = new List<string> { "Email is already in use." } });
            }
            if (existingPhone != null)
            {
                return BadRequest(new { Errors = new List<string> { "Phone is already in use." } });
            }
            var result = await _accountService.RegisterAccountAsync(accountDTO);
            if (result == 1)
            {
                return Ok("Registration successful");
            }
            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromForm] LoginDTO loginDTO)
        {
            Account acc = await _accountService.CheckLogin(loginDTO.Email, loginDTO.Password);
            if (acc == null)
            {
                return BadRequest(new { message = "Invalid email or password" });
            }
            if (acc.Status == 0)
            {
                if (acc.Role == 2 && acc.IsEmailConfirm == 0)
                {
                    return BadRequest(new { message = "Please confirm your email before login" });
                }
            }
            else if (acc.Status == 1 || acc.Status == 2)
            {
                return BadRequest(new { message = "Your account has been previously banned or inactive. Please contact the administrator to resolve your issue." });
            }
            //else if (acc.IsDeleted == 1)
            //{
            //    return Ok(new { message = "Your account has been previously deleted. Please contact the administrator to resolve your issue." });
            //}
            var token = _accountService.GenerateJwtToken(loginDTO.Email, acc.Role, 43200);
            return Ok(new
            {
                //Token = token,
                message = $"Login successfull!",
                Token = token,
            });
        }

        [HttpPost("login-by-google")]
        public async Task<IActionResult> LoginByGoogle([FromForm] LoginGoogleDTO loginGoogle)
        {
            try
            {
                var authResponse = await _accountService.GetFirebaseToken(loginGoogle.FirebaseToken);

                if (authResponse.Token == null)
                {
                    // User needs to complete the sign-up process
                    return BadRequest(new
                    {
                        message = "This account doesn't exist. Please register to gain access to our website"
                    });
                }
                var token = authResponse.Token;
                return Ok(new
                {
                    Token = token,
                    message = "Login Successful"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
            //return ve giong login 
        }

        [HttpPost("register-by-google")]
        public async Task<IActionResult> SignUpGoogleAsStudent([FromForm] RegisterByGoogleDTO request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                    return BadRequest(new { Errors = errors });
                }
                var result = await _accountService.SignUpByGoogleAsync(request.FirebaseToken, request.Phone, request.Birthday, request.Address, request.Gender);
                if (result != null && result is AuthResponseDTO)
                {
                    return Ok(new
                    {
                        AccessToken = result.Token,
                        message = "Registration successful"
                    });
                }
                return BadRequest(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }

        }

        // User Profile
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("view-profile")]
        public async Task<IActionResult> ViewProfileByUser(string accessToken)
        {
            Account account = await _accountService.GetUserAccountAsync(accessToken);
            if (accessToken == null)
            {
                return BadRequest("Cannot get access token");
            }
            if (account == null)
            {
                return BadRequest("Cannot find this account");
            }
            AccountProfileDTO accountProfile = new AccountProfileDTO
            {
                Email = account.Email,
                Fullname = account.FullName,
                Username = account.Username,
                Phone = account.PhoneNumber,
                Birthday = account.Birthday,
                Address = account.Address,
                Gender = account.Gender,
            };
            return Ok(new
            {
                message = "User Profile",
                Profile = accountProfile
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("update-profile")]
        public async Task<IActionResult> UpdateProfileByUser(string accessToken, [FromForm] UpdateAccountProfileDTO accountProfile)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _accountService.UpdateAccountProfileByAdminAsync(accessToken, accountProfile);
            if (result)
            {
                return Ok("Update Successful");
            }
            return NotFound("Account not found or update failed");
        }


        // for seller
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("register-to-seller")]
        public async Task<IActionResult> RegisterToBeSeller([FromForm] SellerDTO sellerDTO)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            if (sellerDTO == null)
            {
                return BadRequest("All fields are required");
            }
            var isSeller = await _accountService.CheckSellerRole(sellerDTO.AccessToken);
            if (isSeller == 1)
            {
                return Conflict(new
                {
                    message = "This account is already a seller"
                });
            }
            
            var result = await _accountService.RegisterToBeSellerAsync(sellerDTO);
            return CreatedAtAction(nameof(RegisterToBeSeller), result);
        }
        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("cancel-to-seller")]
        public async Task<IActionResult> CancelSellerRoleAsync()
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }

            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }
            var result = await _accountService.CancelRoleSellerAsync(accessToken);
            if (result != 1)
            {
                return BadRequest(result);
            }
            return Ok(new
            {
                Message = "Cancel Successful"
            });
        }

        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("seller-profile")]
        public async Task<IActionResult> ViewSellerProfileAsync()
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }
            var result = await _accountService.GetSellerProfileAsync(accessToken);
            return Ok(result);
        }


        [Authorize(Policy = "UserOnly")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("payment-info-of-seller")]
        public async Task<IActionResult> ViewSellerPaymentInfoAsync()
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var accessToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(accessToken))
            {
                return BadRequest("Access token is missing or invalid");
            }
            var result = await _accountService.GetPaymentInfoOfSellerAsync(accessToken);
            return Ok(result);
        }

        [HttpGet("list-of-bank")]
        public async Task<IActionResult> GetListOfBankAsync()
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage));
                return BadRequest(new { Errors = errors });
            }
            var result = await _accountService.GetListOfBankAsync();
            return Ok(result);
        }

        [HttpGet("get-balance")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAccountBalance()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var userEmail = identity.Claims.FirstOrDefault().Value;
            return Ok(new ApiResponse()
            {
                StatusCode = 200,
                Data = await _accountService.GetAccountBalance(userEmail)
            });
        }
    }

}
