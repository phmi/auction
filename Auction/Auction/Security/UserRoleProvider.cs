using System;
using System.Linq;
using System.Web.Security;
using Auction.Repositories;
using Ninject;

namespace Auction.Security
{
    public class UserRoleProvider : RoleProvider
    {
        public const string Admin = "admin";

        public const string Moderator = "moderator";

        [Inject]
        public IUserRepository Repository { get; set; }

        public override bool IsUserInRole(string username, string roleName)
        {
            var user = Repository.GetByUserName(username);
            return user != null && user.IsInRole(roleName);
        }

        public override string[] GetRolesForUser(string username)
        {
            var user = Repository.GetByUserName(username);
            return user.Roles.Select(r => r.Name).ToArray();
        }

        #region NotImplemented

        public override string ApplicationName
        {
            get { throw new NotImplementedException(); }
            set { throw new NotImplementedException(); }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}