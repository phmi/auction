using System.Linq;
using Auction.DataModel.Entities;
using NHibernate;
using NHibernate.Linq;
using Ninject;

namespace Auction.Repositories
{
    public class UserRepository : IUserRepository
    {
        [Inject]
        public ISessionFactory SessionFactory { get; set; }

        public User GetByUserName(string username)
        {
            using (var session = SessionFactory.OpenSession())
            {
                return session.Query<User>().FirstOrDefault(u => u.Name == username);
            }
        }

        public User GetById(long id)
        {
            using (var session = SessionFactory.OpenSession())
            {
                return session.Query<User>().FirstOrDefault(u => u.Id == id);
            }
        }

        public void AddUser(User user)
        {
            using (var session = SessionFactory.OpenSession())
            {
                session.Save(user);
                session.Flush();
            }
        }

        public void Update(User user)
        {
            using (var session = SessionFactory.OpenSession())
            {
                session.Update(user);
                session.Flush();
            }
        }

        public User[] GetUsers(int start, int limit)
        {
            using (var session = SessionFactory.OpenSession())
            {
                return session.Query<User>().OrderBy(u => u.Name).Skip(start).Take(limit).ToArray();
            }
        }

        public int GetTotalCount()
        {
            using (var session = SessionFactory.OpenSession())
            {
                return session.Query<User>().Count();
            }
        }

        public Role[] GetRoles()
        {
            using (var session = SessionFactory.OpenSession())
            {
                return session.Query<Role>().ToArray();
            }
        }

        public void Remove(User user)
        {
            using (var session = SessionFactory.OpenSession())
            {
                session.Delete(user);
                session.Flush();
            }
        }
    }
}