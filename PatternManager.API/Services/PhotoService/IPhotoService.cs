using PatternManager.API.Services.PhotoService.Dtos;
using System.Threading.Tasks;

namespace PatternManager.API.Services.PhotoService
{
    public interface IPhotoService
    {
        Task AddPhoto(PhotoDto photo);
        Task DeletePhoto(PhotoDto photo);
        Task<PhotoDto> GetProfilePhoto(string username);
    }
}