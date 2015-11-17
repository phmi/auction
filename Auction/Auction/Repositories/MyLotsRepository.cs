using System;
using System.Linq;
using Auction.DataModel.Entities;
using NHibernate;
using NHibernate.Linq;
using Ninject;

namespace Auction.Repositories
{
    public class MyLotsRepository : IMyLotsRepository
    {
        [Inject]
        public ISession Session { get; set; }

        public Lot[] GetLots(string userName, int start, int limit)
        {
            return Session.Query<Lot>()
                .Where(l => l.User.Name == userName)
                .OrderByDescending(l => l.DateTime)
                .Skip(start)
                .Take(limit)
                .ToArray();
        }

        public int GetTotalCount(string userName)
        {
            return Session.Query<Lot>().Count(l => l.User.Name == userName);
        }

        public void Save(string userName, Lot lot)
        {
            var user = Session.Query<User>().Single(u => u.Name == userName);
            lot.User = user;
            lot.DateTime = DateTime.Now;
            Session.Save(lot);
            Session.Flush();
        }

        public Lot GetById(string userName, long id)
        {
            return Session.Query<Lot>()
                .FirstOrDefault(l => l.User.Name == userName && l.Id == id);
        }

        public void Remove(Lot lot)
        {
            Session.Delete(lot);
            Session.Flush();
        }

        public void Update(Lot lot)
        {
            Session.Update(lot);
            Session.Flush();
        }
    }
}