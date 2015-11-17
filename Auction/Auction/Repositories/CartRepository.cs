using System.Linq;
using Auction.DataModel.Entities;
using NHibernate;
using NHibernate.Linq;
using Ninject;

namespace Auction.Repositories
{
    public class CartRepository : ICartRepository
    {
        [Inject]
        public ISession Session { get; set; }

        public int GetCount(string userName)
        {
            return Session.Query<CartItem>().Count(i => i.User.Name == userName);
        }

        public CartItem[] GetItems(string userName, int start, int limit)
        {
            return Session.Query<CartItem>().Where(i => i.User.Name == userName).OrderByDescending(u => u.DateTime).Skip(start).Take(limit).ToArray();
        }

        public CartItem GetById(string userName, long cartItemId)
        {
            return Session.Query<CartItem>().FirstOrDefault(i => i.User.Name == userName && i.Id == cartItemId);
        }

        public void Remove(CartItem cartItem)
        {
            cartItem.Lot.CartItems.Remove(cartItem);
            Session.Delete(cartItem);
            Session.Flush();
        }
    }
}