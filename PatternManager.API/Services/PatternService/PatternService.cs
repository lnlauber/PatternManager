using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Data.Models;
using PatternManager.API.Services.PatternService.Dtos;

namespace PatternManager.API.Services.PatternService
{
    public class PatternService : IPatternService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        public PatternService(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        public async Task CreatePatternRecord(PatternDto pattern){
            Pattern patternToCreate = _mapper.Map<Pattern>(pattern);
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