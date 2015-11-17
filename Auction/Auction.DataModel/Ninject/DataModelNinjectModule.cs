using NHibernate;
using Ninject.Modules;

namespace Auction.DataModel.Ninject
{
    public class DataModelNinjectModule : NinjectModule
    {
        public override void Load()
        {
            Bind<ISessionFactory>().ToProvider(new SessionFactoryProvider());
            Bind<ISession>().ToProvider(new SessionProvider());
        }
    }
}
