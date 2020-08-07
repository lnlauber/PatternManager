using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PatternManager.API.Data.Models;
using PatternManager.API.Services.PhotoService.Dtos;

namespace PatternManager.API.Services.PatternService.Dtos
{
    public class PatternDto
    {
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public string Contributer { get; set; }  
        public string Category { get; set; }
        public byte YarnWeight { get; set; }
        public float HookSize { get; set; }
        public string Language { get; set; }
        public string Terminology { get; set; }
        public string SkillLevel { get; set; }
        public IEnumerable<PhotoDto> Photos { get; set; }
        public string MainPhotoUrl { get; set; }
    }
}