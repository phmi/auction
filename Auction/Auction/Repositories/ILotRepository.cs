using System.Linq;
using Auction.DataModel.Entities;

namespace Auction.Repositories
{
    public interface ILotRepository
    {
        IQueryable<Lot> Lots { get; }

        Lot GetById(long id);

        void Update(Lot lot);

        void AddToCart(Lot lot, string userName);
    }
}