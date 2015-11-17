using System;
using System.Linq;
using Auction.DataModel.Entities;
using NHibernate;
using NHibernate.Linq;
using Ninject;

namespace Auction.Repositories
{
    public class LotRepository : ILotRepository
    {
        [Inject]
        public ISession Session { get; set; }

        public IQueryable<Lot> Lots => Session.Query<Lot>();
        public Lot GetById(long id)
        {
            return Session.Query<Lot>().FirstOrDefault(l => l.Id == id);
        }

        public void Update(Lot lot)
        {
            Session.Update(lot);
            Session.Flush();
        }

        public void AddToCart(Lot lot, string userName)
        {
            var user = Session.Query<User>().First(u => u.Name == userName);
            var cartItem = new CartItem
            {
                User = user,
                Lot = lot,
                DateTime = DateTime.Now
            };
            Session.Save(cartItem);
            Session.Flush();
        }
    }
}