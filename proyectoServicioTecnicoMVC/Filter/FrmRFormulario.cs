using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Filter
{
    public class FrmRFormulario : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var Cliente = HttpContext.Current.Session["Recepcion"];
            if (Cliente == null)
            {
                filterContext.Result = new RedirectResult("~/Recepcion/FrmRFormulario");
            }
            base.OnActionExecuted(filterContext);
        }
    }
}