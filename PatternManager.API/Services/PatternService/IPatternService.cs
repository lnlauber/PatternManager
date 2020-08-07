using System.Collections.Generic;
using System.Threading.Tasks;
using PatternManager.API.Services.PatternService.Dtos;

namespace PatternManager.API.Services.PatternService
{
    public interface IPatternService
    {
        Task CreatePatternRecord(PatternDto pattern);
        Task<IEnumerable<PatternDto>> GetPatternRecords();
        Task<PatternDto> GetPattern(int id);
    }
}