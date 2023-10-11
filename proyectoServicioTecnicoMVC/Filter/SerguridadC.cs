using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Filter
{
    public class SerguridadC : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var cliente = HttpContext.Current.Session["ClienteWeb"];
            if (cliente == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
            base.OnActionExecuted(filterContext);
        }
    }
}