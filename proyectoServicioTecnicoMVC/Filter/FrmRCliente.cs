using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Filter
{
    public class FrmRCliente : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            var Cliente = HttpContext.Current.Session["Cliente"];
            if (Cliente == null)
            {
                filterContext.Result = new RedirectResult("~/Recepcion/FrmRCliente");
            }
            base.OnActionExecuted(filterContext);
        }


    }
}