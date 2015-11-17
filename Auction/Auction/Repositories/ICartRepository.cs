using Auction.DataModel.Entities;

namespace Auction.Repositories
{
    public interface ICartRepository
    {
        int GetCount(string userName);

        CartItem[] GetItems(string userName, int start, int limit);

        CartItem GetById(string userName, long cartItemId);

        void Remove(CartItem cartItem);
    }
}