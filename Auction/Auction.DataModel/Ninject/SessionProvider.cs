using NHibernate;
using Ninject.Activation;

namespace Auction.DataModel.Ninject
{
    internal class SessionProvider : Provider<ISession>
    {
        protected override ISession CreateInstance(IContext context)
        {
            var factory = (ISessionFactory)context.Kernel.GetService(typeof(ISessionFactory));
            return factory.OpenSession();
        }
    }
}
