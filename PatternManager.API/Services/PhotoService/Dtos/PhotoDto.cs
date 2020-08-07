using System;
using Microsoft.AspNetCore.Http;

namespace PatternManager.API.Services.PhotoService.Dtos
{
    public class PhotoDto
    {
        public string Url {get;set;}
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public string Username { get; set; }
        public int PatternId { get; set; }
        public bool IsProfile { get; set; }
        public bool IsPattern { get; set; }
        public bool IsMain { get; set; }
    }
}