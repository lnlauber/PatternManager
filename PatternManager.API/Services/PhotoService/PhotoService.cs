using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Helpers;
using PatternManager.API.Services.PhotoService.Dtos;
using CloudinaryDotNet.Actions;
using PatternManager.API.Data.Models;
using PatternManager.API.Utilities;
using PatternManager.API.Services.UserService;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;

namespace PatternManager.API.Services.PhotoService
{
    public class PhotoService : IPhotoService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IUserService _userService;
        public PhotoService(IUnitOfWork uow, 
                            IOptions<CloudinarySettings> cloudinaryConfig,
                            IUserService userService)
        {
            _uow = uow;
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()).CreateMapper();

            Account acc = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
            _userService = userService;
        }

        public async Task AddPhoto(PhotoDto photoDto){
            var file = photoDto.File;
            if(photoDto.IsProfile){
                var saved = await _uow.Get<Photo>().FirstOrDefaultAsync(p => p.User.Username == photoDto.Username && p.IsProfile == true);
                if(saved != null){
                    await _cloudinary.DeleteResourcesAsync(new string[]{saved.PublicId});
                    _uow.Delete(saved);
                }
            }
            else if (photoDto.IsMain){
                var saved = await _uow.Get<Photo>().FirstOrDefaultAsync(p => p.IsMain == true && p.Pattern.Id == photoDto.PatternId);
                if(saved != null){
                    saved.IsMain = false;
                    _uow.Update(saved);
                }
            }
            
            var uploadResult = new ImageUploadResult();
                using (var stream = file.OpenReadStream()){
                    var uploadParams = new ImageUploadParams(){
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            photoDto.Url = uploadResult.Url.ToString();
            photoDto.PublicId = uploadResult.PublicId;
            
            var photo = _mapper.Map<Photo>(photoDto);
            var user = _uow.Get<User>().FirstOrDefault(u=> u.Username == photoDto.Username);
            var pattern = _uow.Get<Pattern>().FirstOrDefault(p => p.Id == photoDto.PatternId);
            photo.User = user;
            photo.Pattern = pattern;
            photo.DateAdded = DateTime.Now;
            _uow.Add<Photo>(photo); 
            await _uow.CommitAsync();
        }

        public async Task DeletePhoto(PhotoDto photo){
            var saved = await _uow.Get<Photo>().FirstOrDefaultAsync(p => p.PublicId == photo.PublicId);
            _uow.Delete(saved);
            await _uow.CommitAsync();
        }

        public async Task<PhotoDto> GetProfilePhoto(string username){
            var photo = await _uow.Get<Photo>().FirstOrDefaultAsync(p => p.User.Username == username && p.IsProfile == true);
            return _mapper.Map<PhotoDto>(photo);
        }

        public async Task<IEnumerable<PhotoDto>> GetPatternPhotos(int patternId){
            var photos = await _uow.Get<Photo>().Where(p => p.Pattern.Id == patternId).ToListAsync();
            return photos.Select(p => _mapper.Map<PhotoDto>(p));
        }

    }
}