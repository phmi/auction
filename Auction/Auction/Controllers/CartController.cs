using System.Linq;
using System.Web.Mvc;
using Auction.Models;
using Auction.Repositories;
using Auction.Security;
using Ninject;

namespace Auction.Controllers
{
    [Authorize]
    public class CartController : ControllerBase
    {
        [Inject]
        public ICartRepository CartRepository { get; set; }

        [AllowAnonymous]
        public JsonResult Count()
        {
            return JsonSuccess(new
            {
                Count = CartRepository.GetCount(HttpContext.User.Identity.Name)
            });
        }

        public JsonResult Items(int start, int limit)
        {
            return JsonSuccess(new
            {
                Items = CartRepository.GetItems(HttpContext.User.Identity.Name, start, limit).Select(CartItemModel.FromCartItem).ToArray(),
                TotalCount = CartRepository.GetCount(HttpContext.User.Identity.Name)
            });
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Remove(CartItemModel cartItemModel)
        {
            var cartItem = CartRepository.GetById(HttpContext.User.Identity.Name, cartItemModel.Id);
            CartRepository.Remove(cartItem);
            return JsonSuccess();
        }
    }
}