using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatternManager.API.Services.UserService;
using PatternManager.API.Services.UserService.Dtos;

namespace PatternManager.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
        
        [HttpGet]
        [Route("/users")]
        public async Task<IActionResult> GetUsers(){
            var users = await _userService.GetUsers();
            return Ok(users);
        }


        [HttpGet]
        [Route("/users/search")]
        public async Task<IActionResult> SearchUsers(string searched){
            var users = await _userService.SearchUsers(searched);
            return Ok(users);
        }


        [HttpGet]
        [Route("/users/current")]
        public async Task<IActionResult> GetCurrentUser(string username){
            var user = await _userService.GetCurrentUser(username);
            return Ok(user);
        }

        [HttpPost]
        [Route("/users/updateUser")]
        public async Task<IActionResult> UpdateUser(UserForProfile edited){
            var user = await _userService.UpdateUser(edited);
            return Ok(user);
        }
        



    }
}
