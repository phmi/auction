using System.Linq;
using System.Web.Mvc;
using Auction.DataModel.Entities;
using Auction.Models;
using Auction.Repositories;
using Auction.Security;
using Ninject;

namespace Auction.Controllers
{
    [Authorize(Roles = UserRoleProvider.Admin)]
    public class UsersController : ControllerBase
    {
        [Inject]
        public IUserRepository UserRepository { get; set; }

        [Inject]
        public IPasswordEncryptor PasswordEncryptor { get; set; }

        public JsonResult Index(int start, int limit)
        {
            var users = UserRepository.GetUsers(start, limit);
            var totalUsers = UserRepository.GetTotalCount();
            return JsonSuccess(new
            {
                Users = users.Select(UserModel.FromUser).ToArray(),
                TotalCount = totalUsers
            });
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Update(UserModel userModel)
        {
            var user = UserRepository.GetByUserName(userModel.Name);
            if (user != null && user.Id != userModel.Id)
            {
                return JsonError("Указанный пользователь уже существует");
            }
            if (user == null)
            {
                user = UserRepository.GetById(userModel.Id);
            }
            userModel.ToUser(user, UserRepository.GetRoles());
            UserRepository.Update(user);
            return JsonSuccess();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult SetPassword(long id, string password)
        {
            var user = UserRepository.GetById(id);
            user.Password = PasswordEncryptor.Encrypt(password, user.Salt);
            UserRepository.Update(user);
            return JsonSuccess();
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Remove(UserModel userModel)
        {
            var user = UserRepository.GetById(userModel.Id);
            UserRepository.Remove(user);
            return JsonSuccess();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Add(UserModel userModel, string password)
        {
            var user = UserRepository.GetByUserName(userModel.Name);
            if (user != null)
            {
                JsonError("Пользователь уже существует");
            }

            user = new User();
            userModel.ToUser(user, UserRepository.GetRoles());
            var salt = PasswordEncryptor.GenerateSalt();
            user.Salt = salt;
            user.Password = PasswordEncryptor.Encrypt(password, salt);
            UserRepository.AddUser(user);
            return JsonSuccess();
        }
    }
}