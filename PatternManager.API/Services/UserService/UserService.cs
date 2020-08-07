using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PatternManager.API.Data;
using PatternManager.API.Data.Interfaces;
using PatternManager.API.Data.Models;
using PatternManager.API.Services.UserService.Dtos;
using PatternManager.API.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace PatternManager.API.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper; 
        public UserService(IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>()).CreateMapper();
        }

        public async Task<UserDto> Login(UserForLoginDto loginDto){
            var user = await _uow.Get<User>().Where(u => u.Username == loginDto.Username.ToLower()).FirstOrDefaultAsync();
            if(user == null){
                return null;
            }
            if(!Sodium.PasswordHash.ScryptHashStringVerify(user.PasswordHash, loginDto.Password)){
                return null;
            }
            return _mapper.Map<UserDto>(user);    
        }

        public async Task<bool> UserExists(string username){
            if(await _uow.Get<User>().Where(u => u.Username == username).AnyAsync()){
                return true;
            }
            return false;
        }

        public async Task<UserDto> Register(UserForRegisterDto userDto){
            var user = RegistrationProjection(userDto);
            _uow.Add<User>(user);
            await _uow.CommitAsync();
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserForProfile> GetCurrentUser(string username)
        {
            var user = await _uow.Get<User>().Include(p => p.Photos).FirstOrDefaultAsync(u => u.Username == username);
            var userDto = _mapper.Map<UserForProfile>(user);
            var url = userDto.ProfilePicture.Url;
            return userDto;
        }

        public async Task<IEnumerable<UserForProfile>> GetUsers()
        {
            var users = await _uow.Get<User>().Include(p => p.Photos).ToListAsync();
            var dtos = users.Select(u => _mapper.Map<UserForProfile>(u));
            return dtos;
        }
        public async Task<UserDto> GetUser(string username){
            var user = await _uow.Get<User>().FirstOrDefaultAsync(u => u.Username == username);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<IEnumerable<UserForProfile>> SearchUsers(string search){
            var split = search.Split(' ');
            var users = await _uow.Get<User>().ToListAsync();
            foreach( var u in users){
                foreach(var s in split){
                    var ls = s.ToLower();
                    if(!(u.FirstName.ToLower().Contains(ls) || u.LastName.ToLower().Contains(ls) || u.Email.ToLower().Contains(ls) || u.Username.ToLower().Contains(ls))){
                        users.Remove(u);
                    }
                }
            }
            return users.Select(u => _mapper.Map<UserForProfile>(u));
        }

        public async Task<UserForProfile> UpdateUser(UserForProfile edited){
            var saved = await _uow.Get<User>().FirstOrDefaultAsync(s => s.Username == edited.Username);
            saved.About = edited.About;
            _uow.Update(saved);
            await _uow.CommitAsync();
            return edited;
        }

        private static readonly Func<UserForRegisterDto, User> RegistrationProjection = user => new User{
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Username = user.Username.ToLower(),
            PasswordHash = Sodium.PasswordHash.ScryptHashString(user.Password),
            DateJoined = DateTime.Now
        };
    }
}