using System.Linq;
using Auction.DataModel.Entities;
using Auction.Security;

namespace Auction.Models
{
    public class UserModel
    {
        public static UserModel FromUser(User user)
        {
            return new UserModel
            {
                Id = user.Id,
                Name = user.Name,
                IsAdmin = user.IsInRole(UserRoleProvider.Admin),
                IsModerator = user.IsInRole(UserRoleProvider.Moderator)
            };
        }

        public void ToUser(User user, Role[] allRoles)
        {
            user.Id = Id;
            user.Name = Name;
            
            if (IsAdmin)
            {
                if (user.Roles.All(r => r.Name != UserRoleProvider.Admin))
                {
                    user.Roles.Add(allRoles.First(r => r.Name == UserRoleProvider.Admin));
                }
            }
            else
            {
                var role = user.Roles.FirstOrDefault(r => r.Name == UserRoleProvider.Admin);
                if (role != null)
                {
                    user.Roles.Remove(role);
                }
            }

            if (IsModerator)
            {
                if (user.Roles.All(r => r.Name != UserRoleProvider.Moderator))
                {
                    user.Roles.Add(allRoles.First(r => r.Name == UserRoleProvider.Moderator));
                }
            }
            else
            {
                var role = user.Roles.FirstOrDefault(r => r.Name == UserRoleProvider.Moderator);
                if (role != null)
                {
                    user.Roles.Remove(role);
                }
            }
        }

        public long Id { get; set; }

        public string Name { get; set; }

        public bool IsAdmin { get; set; }

        public bool IsModerator { get; set; }
    }
}