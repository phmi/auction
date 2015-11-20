using Auction.Repositories;
using Auction.Security;
using Ninject.Modules;

namespace Auction
{
    public class AuctionNinjectModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IPasswordEncryptor>().To<PasswordEncryptor>();
            Bind<ILotRepository>().To<LotRepository>();
            Bind<IMyLotsRepository>().To<MyLotsRepository>();
            Bind<IUserRepository>().To<UserRepository>();
            Bind<ICartRepository>().To<CartRepository>();
        }
    }
}