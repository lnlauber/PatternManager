using System;
using System.ComponentModel.DataAnnotations;

namespace PatternManager.API.Data.Models
{
    public class Photo
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        [Required]
        public bool IsProfile { get; set; }
        [Required]
        public bool IsPattern { get; set; }
        [Required]
        public bool IsMain { get; set; }
        [Required]
        public string PublicId { get; set; }
        [Required]
        public User User { get; set; }
        public Pattern? Pattern { get; set; }
    }
}