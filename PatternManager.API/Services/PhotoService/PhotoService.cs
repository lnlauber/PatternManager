using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Helpers;
using PatternManager.API.Services.PhotoService.Dtos;

namespace PatternManager.API.Services.PhotoService
{
    public class PhotoService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotoService(IUnitOfWork uow, 
                            IMapper mapper, 
                            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _uow = uow;
            _mapper = mapper;

            Account acc = new Account(
                cloudinaryConfig.Value.CloudName,
                cloudinaryConfig.Value.ApiKey,
                cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task AddPhoto(int userId, PhotoDto photo){
            
        }
    }
}