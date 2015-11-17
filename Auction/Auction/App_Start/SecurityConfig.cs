using System.Web.Security;
using Auction.Utils;

namespace Auction
{
    public class SecurityConfig
    {
        public static void Register()
        {
            NinjectKernel.Default.Inject(Membership.Provider);
            NinjectKernel.Default.Inject(Roles.Provider);
        }
    }
}