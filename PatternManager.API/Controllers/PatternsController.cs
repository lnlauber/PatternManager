using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PatternManager.API.Services.PatternService;
using PatternManager.API.Services.PatternService.Dtos;

namespace PatternManager.API.Controllers
{
    [Authorize]
    [ApiController]
    public class PatternsController : ControllerBase
    {
        private readonly IPatternService _patternService;
        public PatternsController(IPatternService patternService)
        {   
            _patternService = patternService;
        }
        [HttpGet]
        [Route("api/patterns")]
        public async Task<IActionResult> GetAllPatterns(){
            var patterns = await _patternService.GetPatternRecords();
            return Ok(patterns);
        }
        [HttpGet]
        [Route("api/pattern")]
        public async Task<IActionResult> GetPattern(int id){
            var pattern = await _patternService.GetPattern(id);
            return Ok(pattern);
        }
        
        [HttpPost]
        [Route("api/pattern/create")]
        public async Task<IActionResult> CreatePattern(PatternDto pattern){
            await _patternService.CreatePatternRecord(pattern);
            return Ok();
        }

    }
}