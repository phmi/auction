using System;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace Auction.Security
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
    public class ValidateHeaderAntiForgeryTokenAttribute : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            AntiForgery.Validate(HttpContext.Current.Request.Cookies["__RequestVerificationToken"]?.Value, HttpContext.Current.Request.Headers["--RequestVerificationToken"]);
        }
    }
}