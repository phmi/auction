using Auction.DataModel.Entities;

namespace Auction.Repositories
{
    public interface IMyLotsRepository
    {
        Lot[] GetLots(string userName, int start, int limit);

        int GetTotalCount(string userName);

        void Save(string userName, Lot lot);

        Lot GetById(string userName, long id);

        void Remove(Lot lot);

        void Update(Lot lot);
    }
}