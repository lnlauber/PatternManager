using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PatternManager.API.Data.Models
{
    public class User
    {
        [Key]
        [Required]
        public string Username { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public DateTime DateJoined { get; set; }
        public string About { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Pattern> Patterns { get; set; }
    }
}