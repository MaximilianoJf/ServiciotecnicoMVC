using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Capa_Entidad;
using Capa_Negocio;
using proyectoServicioTecnicoMVC.Filter;

namespace proyectoServicioTecnicoMVC.Controllers
{
    public class PagoController : Controller
    {
        // GET: Pago
        [Seguridad]
        public JsonResult lista()
        {
            PagoBL objetos = new PagoBL();
            return Json(objetos.ListarPago(), JsonRequestBehavior.AllowGet);
        }
    }
}