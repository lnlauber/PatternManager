using System.ComponentModel.DataAnnotations;
using PatternManager.API.Services.PhotoService.Dtos;

namespace PatternManager.API.Services.UserService.Dtos
{
    public class UserForProfile
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string About { get; set; }
        public string Joined { get; set; }
        public PhotoDto ProfilePicture { get; set; }
    }
}