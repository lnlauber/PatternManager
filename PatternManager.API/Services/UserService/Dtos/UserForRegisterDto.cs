using System.ComponentModel.DataAnnotations;

namespace PatternManager.API.Services.UserService.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage ="Password must be greater than 4 characters, and less than 16 characters.")]
        public string Password { get; set; }
    }
}