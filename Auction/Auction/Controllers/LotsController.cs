using System.Linq;
using System.Web.Mvc;
using Auction.DataModel.Entities;
using Auction.Models;
using Auction.Repositories;
using Auction.Security;
using Ninject;

namespace Auction.Controllers
{
    public class LotsController : ControllerBase
    {
        [Inject]
        public ILotRepository LotRepository { get; set; }

        public JsonResult Index(string searchStr, int start, int limit)
        {
            IQueryable<Lot> allLots = LotRepository.Lots.OrderByDescending(l => l.DateTime);
            if (!string.IsNullOrWhiteSpace(searchStr))
            {
                var searchStrArray = searchStr
                    .Split(' ')
                    .Where(s => !string.IsNullOrWhiteSpace(s))
                    .Select(s => s.ToLower())
                    .ToArray();
                foreach (var s in searchStrArray)
                {
                    allLots = allLots.Where(l => l.Name.ToLower().Contains(s) || l.Description.ToLower().Contains(s));
                }
            }
            if (!HttpContext.User.IsInRole(UserRoleProvider.Moderator))
            {
                allLots = allLots.Where(l => !l.Hidden);
            }
            allLots = allLots.Where(l => !l.CartItems.Any());
            var lots = allLots.Skip(start).Take(limit).ToArray();
            var totalLots = allLots.Count();
            return JsonSuccess(new
            {
                Lots = lots.Select(LotModel.FromLot).ToArray(),
                TotalCount = totalLots
            });
        }

        [Authorize(Roles = UserRoleProvider.Moderator)]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult HideLot(long id)
        {
            var lot = LotRepository.GetById(id);
            lot.Hidden = true;
            LotRepository.Update(lot);
            return JsonSuccess();
        }

        [Authorize(Roles = UserRoleProvider.Moderator)]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult ShowLot(long id)
        {
            var lot = LotRepository.GetById(id);
            lot.Hidden = false;
            LotRepository.Update(lot);
            return JsonSuccess();
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult AddToCart(long id)
        {
            var lot = LotRepository.GetById(id);
            if (lot.CartItems.Any())
            {
                return JsonError("Лот уже добавлен в корзину");
            }
            LotRepository.AddToCart(lot, HttpContext.User.Identity.Name);
            return JsonSuccess();
        }
    }
}