using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatternManager.API.Services.PhotoService;
using PatternManager.API.Services.PhotoService.Dtos;
using System.Threading.Tasks;
using System.Security.Claims;


namespace PatternManager.API.Controllers
{
    [Authorize]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        public PhotosController(IPhotoService photoService)
        {
            _photoService = photoService;
        }
        [HttpPost]
        [Route("api/AddPhoto")]
        public async Task<IActionResult> AddProfilePhoto([FromForm] PhotoDto photo){
            if (photo.Username != User.FindFirst(ClaimTypes.NameIdentifier).Value.ToString()){
                return Unauthorized();
            }
            if (photo.File.Length > 0 && (photo.IsPattern !| photo.IsProfile)){
                await _photoService.AddPhoto(photo);
                return Ok();
            }

            return BadRequest("Could not add the photo.");
        }

        [HttpDelete]
        [Route("api/DeletePhoto")]
        public async Task<IActionResult> DeletePhoto(PhotoDto  photo){
            if (photo.Username != User.FindFirst(ClaimTypes.NameIdentifier).Value.ToString()){
                return Unauthorized();
            }
            if(photo.PublicId != null){
                await _photoService.DeletePhoto(photo);
            }
            return Ok();
        }

        [HttpGet]
        [Route("api/GetProfilePhoto")]
        public async Task<IActionResult> GetProfilePhoto(string username){
            var photo = await _photoService.GetProfilePhoto(username);
            return Ok(photo);
        }

    }
}