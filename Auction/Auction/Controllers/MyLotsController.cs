using System.Linq;
using System.Net;
using System.Web.Mvc;
using Auction.DataModel.Entities;
using Auction.Models;
using Auction.Repositories;
using Auction.Security;
using Ninject;

namespace Auction.Controllers
{
    [Authorize]
    public class MyLotsController : ControllerBase
    {
        [Inject]
        public IMyLotsRepository MyLotsRepository { get; set; }

        public JsonResult Index(int start, int limit)
        {
            return JsonSuccess(new
            {
                Lots = MyLotsRepository.GetLots(HttpContext.User.Identity.Name, start, limit).Select(LotModel.FromLot).ToArray(),
                TotalCount = MyLotsRepository.GetTotalCount(HttpContext.User.Identity.Name)
            });
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Add(LotModel lotModel)
        {
            var lot = new Lot
            {
                Name = lotModel.Name,
                Description = lotModel.Description,
                Price = lotModel.Price
            };
            MyLotsRepository.Save(HttpContext.User.Identity.Name, lot);
            return JsonSuccess(new
            {
                Lots = new [] { LotModel.FromLot(lot) }
            });
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Update(LotModel lotModel)
        {
            var lot = MyLotsRepository.GetById(HttpContext.User.Identity.Name, lotModel.Id);
            lot.Name = lotModel.Name;
            lot.Description = lotModel.Description;
            lot.Price = lotModel.Price;
            MyLotsRepository.Update(lot);
            return JsonSuccess(new
            {
                Lots = new[] { LotModel.FromLot(lot) }
            });
        }

        [HttpPost]
        [ValidateHeaderAntiForgeryToken]
        public JsonResult Remove(LotModel lotModel)
        {
            var lot = MyLotsRepository.GetById(HttpContext.User.Identity.Name, lotModel.Id);
            MyLotsRepository.Remove(lot);
            return JsonSuccess();
        }
    }
}