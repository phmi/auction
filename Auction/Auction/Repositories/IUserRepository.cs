using Auction.DataModel.Entities;

namespace Auction.Repositories
{
    public interface IUserRepository
    {
        User GetByUserName(string username);

        User GetById(long id);

        void AddUser(User user);

        void Update(User user);

        User[] GetUsers(int start, int limit);

        int GetTotalCount();

        Role[] GetRoles();

        void Remove(User user);
    }
}