using System.Collections.Generic;
using System.Threading.Tasks;
using PatternManager.API.Services.UserService.Dtos;

namespace PatternManager.API.Services.UserService
{
    public interface IUserService
    {
        Task<UserDto> Login(UserForLoginDto user);

        Task<bool> UserExists(string username);

        Task<UserDto> Register(UserForRegisterDto userDto); 
        Task<UserForProfile> GetCurrentUser(string username);
        Task<UserDto> GetUser(string username);
        Task<IEnumerable<UserForProfile>> GetUsers();
        Task<IEnumerable<UserForProfile>> SearchUsers(string search);
        Task<UserForProfile> UpdateUser(UserForProfile edited);
    }
}