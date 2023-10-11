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
    public class ReparacionPresupuestoController : Controller
    {
        public JsonResult lista(int id)
        {
            ReparacionPresupuestoBL objetos = new ReparacionPresupuestoBL();
            return Json(objetos.ListarReparacionPresupuesto(id), JsonRequestBehavior.AllowGet);
        }
    }
}