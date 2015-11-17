using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using Auction.DataModel.Entities;
using Auction.Models;
using Auction.Repositories;
using Auction.Security;
using Ninject;

namespace Auction.Controllers
{
    public class AccountController : ControllerBase
    {
        [Inject]
        public IUserRepository UserRepository { get; set; }

        [Inject]
        public IPasswordEncriptor PasswordEncriptor { get; set; }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult LogOn(string username, string password, bool rememberMe)
        {
            var user = UserRepository.GetByUserName(username);
            if (user == null || user.Password != PasswordEncriptor.Encript(password))
            {
                return JsonError("Неверное имя пользователя или пароль");
            }

            FormsAuthentication.SetAuthCookie(user.Name, rememberMe);
            return JsonSuccess(new
            {
                User = UserModel.FromUser(user)
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Register(string username, string password, bool rememberMe, bool isAdmin, bool isModerator)
        {
            var user = UserRepository.GetByUserName(username);
            if (user != null)
            {
                return JsonError("Пользователь уже существует");
            }

            user = new User
            {
                Name = username,
                Password = PasswordEncriptor.Encript(password)
            };

            var roles = UserRepository.GetRoles();
            if (isAdmin)
            {
                user.Roles.Add(roles.First(r => r.Name == UserRoleProvider.Admin));
            }
            if (isModerator)
            {
                user.Roles.Add(roles.First(r => r.Name == UserRoleProvider.Moderator));
            }

            UserRepository.AddUser(user);
            
            FormsAuthentication.SetAuthCookie(user.Name, rememberMe);
            return JsonSuccess(new
            {
                User = UserModel.FromUser(user)
            });
        }

        [HttpPost]
        public JsonResult LogOff()
        {
            FormsAuthentication.SignOut();
            return JsonSuccess();
        }

        public ActionResult RefreshToken()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult CurrentUser()
        {
            var user = UserRepository.GetByUserName(System.Web.HttpContext.Current.User.Identity.Name);
            return JsonSuccess(new
            {
                User = user == null ? null : UserModel.FromUser(user)
            });
        }

        public JsonResult LoginRequired()
        {
            return JsonError("Необходимо войти пользователю");
        }
    }
}