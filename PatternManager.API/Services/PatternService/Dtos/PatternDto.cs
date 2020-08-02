using System;
using System.ComponentModel.DataAnnotations;
using PatternManager.API.Data.Models;

namespace PatternManager.API.Services.PatternService.Dtos
{
    public class PatternDto
    {
        [Required]
        public string Url { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public string Contributer { get; set; }  
    }
}