using Auction.DataModel.Ninject;
using Ninject;

namespace Auction.Utils
{
    public class NinjectKernel : StandardKernel
    {
        private NinjectKernel() : base(new DataModelNinjectModule(), new AuctionNinjectModule()) { }

        public T Resolve<T>()
        {
            return (T)this.Get(typeof(T));
        }

        public readonly static NinjectKernel Default = new NinjectKernel();
    }
}