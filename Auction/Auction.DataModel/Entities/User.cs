using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace Auction.DataModel.Entities
{
    public class User : IPrincipal
    {
        public virtual long Id { get; set; }

        public virtual string Name { get; set; }

        public virtual string Password { get; set; }

        private List<Role> _roles;

        public virtual IList<Role> Roles
        {
            get { return _roles ?? (_roles = new List<Role>()); }
        }

        public virtual bool IsInRole(string role)
        {
            return Roles.Any(r => r.Name == role);
        }

        public virtual IIdentity Identity { get; set; }

        private List<CartItem> _cartItems;

        public virtual IList<CartItem> CartItems
        {
            get { return _cartItems ?? (_cartItems = new List<CartItem>()); }
        }
    }
}
