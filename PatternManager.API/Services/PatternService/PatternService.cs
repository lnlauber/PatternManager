using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Data.Models;
using PatternManager.API.Services.PatternService.Dtos;
using PatternManager.API.Services.PhotoService.Dtos;
using PatternManager.API.Services.UserService;
using PatternManager.API.Utilities;

namespace PatternManager.API.Services.PatternService
{
    public class PatternService : IPatternService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public PatternService(IUnitOfWork uow, IUserService userService)
        {
            _uow = uow;
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()).CreateMapper();
            _userService = userService;
        }
        public async Task CreatePatternRecord(PatternDto pattern){
            pattern.DateAdded = DateTime.Now;
            var user = await _uow.Get<User>().FirstOrDefaultAsync(u => u.Username == pattern.Contributer);
            Pattern patternToCreate = _mapper.Map<Pattern>(pattern);
            patternToCreate.Contributer = user;
            _uow.Add(patternToCreate);
            await _uow.CommitAsync();
                        
        }
        public async Task<IEnumerable<PatternDto>> GetPatternRecords(){
            var patterns = await _uow.Get<Pattern>().ToListAsync();
            
            var patternDtos = patterns.Select(p => _mapper.Map<PatternDto>(p)).ToList();
            for(var i = 0; i<patternDtos.Count(); i++){
                var photo = _uow.Get<Photo>().FirstOrDefault(p => p.Pattern.Id == patternDtos[i].Id);
                if(photo != null){
                    patternDtos[i].MainPhotoUrl = photo.Url;
                }
            }
            return patternDtos;
        }
        public async Task<PatternDto> GetPattern(int id){
            var pattern = await _uow.Get<Pattern>().Include(u => u.Contributer).FirstOrDefaultAsync(p => p.Id == id);
            var photos = await _uow.Get<Photo>().Where(p => p.Pattern.Id == id).ToListAsync();
            var dto = _mapper.Map<PatternDto>(pattern);
            dto.Photos = photos.Select(p => _mapper.Map<PhotoDto>(p));
            dto.Contributer = (pattern.Contributer.FirstName + " " + pattern.Contributer.LastName);
            return dto;
        }
        public async Task<IEnumerable<PatternDto>> SearchPatterns(string search){
            var split = search.Split(' ');
            var patterns = await _uow.Get<Pattern>().ToListAsync();
            foreach( var p in patterns){
                foreach(var s in split){
                    var ls = s.ToLower();
                    if(!(p.Title.Contains(ls) || p.Description.Contains(ls))){
                        patterns.Remove(p);
                    }
                }
            }
            return patterns.Select(u => _mapper.Map<PatternDto>(u));
        }

    }
}