using System.Web.Mvc;

namespace Auction.Controllers
{
    public class ControllerBase : Controller
    {
        protected JsonResult JsonError(string error)
        {
            return Json(new
            {
                success = false,
                Error = error
            }, JsonRequestBehavior.AllowGet);
        }

        protected JsonResult JsonSuccess()
        {
            return Json(new
            {
            }, JsonRequestBehavior.AllowGet);
        }

        protected JsonResult JsonSuccess(object data)
        {
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}