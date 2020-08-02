using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Data.Models;
using PatternManager.API.Services.PatternService.Dtos;
using PatternManager.API.Services.UserService;
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
            var user = await _uow.Get<User>().FirstOrDefaultAsync(u => u.Username == pattern.Contributer);
            Pattern patternToCreate = _mapper.Map<Pattern>(pattern);
            patternToCreate.Contributer = user;
            _uow.Add(patternToCreate);
            await _uow.CommitAsync();
                        
        }
        public async Task<IEnumerable<PatternDto>> GetPatternRecords(){
            var patterns = await _uow.Get<Pattern>().ToListAsync();
            return patterns.Select(p => _mapper.Map<PatternDto>(p));
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