using PatternManager.API.Services.PhotoService.Dtos;

namespace PatternManager.API.Services.UserService.Dtos
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public PhotoDto ProfilePhoto { get; set; }
    }
}