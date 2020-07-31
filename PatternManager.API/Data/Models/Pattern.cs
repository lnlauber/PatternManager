using System;
using System.ComponentModel.DataAnnotations;

namespace PatternManager.API.Data.Models
{
    public class Pattern
    {
        public int Id { get; set; }
        public string Url { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public User Contributer { get; set; }
    }
}