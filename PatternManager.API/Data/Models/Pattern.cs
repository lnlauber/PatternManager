using System;
using System.ComponentModel.DataAnnotations;

namespace PatternManager.API.Data.Models
{
    public class Pattern
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime DateAdded { get; set; }
        [Required]
        public User Contributer { get; set; }
        public string Category { get; set; }
        public byte YarnWeight { get; set; }
        public float HookSize { get; set; }
        public string Language { get; set; }
        public string Terminology { get; set; }
        public string SkillLevel { get; set; }


    }
}