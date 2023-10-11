using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Controllers
{
    public class HorarioAgendamientoController : Controller
    {

        public ActionResult VerSolicitudes()
        {
            return View();
        }

        public JsonResult ListarSolicitudFecha(string fecha)
        {
            HorarioAgendamientoBL objetos = new HorarioAgendamientoBL();
            return Json(objetos.ListarSolicitudFecha(fecha), JsonRequestBehavior.AllowGet);
        }
    }
}