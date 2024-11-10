namespace EventFlowerExchange_Espoir.Models.DTO
{
    public class AuthResponseDTO
    {
        public string Email { get; set; }
        public string FullName { get; set; }
        public int Role { get; set; }
        public string Token { get; set; }
        public string Message { get; set; }
        public bool Success { get; set; }
    }
}
