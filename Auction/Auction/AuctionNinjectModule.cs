using Auction.Repositories;
using Auction.Security;
using Ninject.Modules;

namespace Auction
{
    public class AuctionNinjectModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IPasswordEncriptor>().To<PasswordEncriptor>();
            Bind<ILotRepository>().To<LotRepository>();
            Bind<IMyLotsRepository>().To<MyLotsRepository>();
            Bind<IUserRepository>().To<UserRepository>();
            Bind<ICartRepository>().To<CartRepository>();
        }
    }
}