using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Filter
{
    public class Seguridad : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var Automotriz = HttpContext.Current.Session["Automotriz"];
            if(Automotriz == null)
            {
                filterContext.Result = new RedirectResult("~/Login/Index");
            }
            base.OnActionExecuted(filterContext);
        }
    }
}