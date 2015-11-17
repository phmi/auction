using System;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject;

namespace Auction.Utils
{
    public class NinjectControllerFactory : DefaultControllerFactory
    {
        protected override IController GetControllerInstance(RequestContext requestContext,
            Type controllerType)
        {
            return controllerType == null ? null : (IController)NinjectKernel.Default.Get(controllerType);
        }
    }
}