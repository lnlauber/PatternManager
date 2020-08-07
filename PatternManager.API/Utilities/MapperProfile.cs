using AutoMapper;
using PatternManager.API.Services.UserService.Dtos;
using PatternManager.API.Data.Models;
using System.Linq;
using PatternManager.API.Services.PhotoService.Dtos;
using PatternManager.API.Services.PatternService.Dtos;

namespace PatternManager.API.Utilities
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<UserDto, User>();
            CreateMap<User, UserDto>();
            CreateMap<User, UserForLoginDto>();
            CreateMap<User, UserForRegisterDto>();
            CreateMap<User, UserForProfile>()
            .ForMember(dest => dest.FullName, src => src.MapFrom(s => s.FirstName + " " + s.LastName))
            .ForMember(dest => dest.Joined, src => src.MapFrom(s => s.DateJoined.ToShortDateString()))
            .ForMember(dest => dest.ProfilePicture, src => src.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsProfile == true)));
            CreateMap<Photo, PhotoDto>();
            CreateMap<PhotoDto, Photo>();
            CreateMap<Pattern, PatternDto>()
            .ForMember(dest => dest.Contributer, opt => opt.Ignore());
            CreateMap<PatternDto, Pattern>()
            .ForMember(dest => dest.Contributer, opt => opt.Ignore());
        }
    }
}