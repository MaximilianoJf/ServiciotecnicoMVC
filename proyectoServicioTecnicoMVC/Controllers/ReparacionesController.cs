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
    [Seguridad]
    public class ReparacionesController : Controller
    {
        public ActionResult formularioReparaciones()
        {
            return View();
        }
        public JsonResult lista()
        {
            ReparacionesBL objetos = new ReparacionesBL();
            return Json(objetos.ListarReparaciones(), JsonRequestBehavior.AllowGet);
        }

        public int EliminarReparacion(int id)
        {
            ReparacionesBL objetos = new ReparacionesBL();
            return objetos.EliminarReparacion(id);
        }

        public int guardarDatos(ReparacionesCLS oReparacionesCLS)
        {
            ReparacionesBL objetos = new ReparacionesBL();
            return objetos.GuardarReparacion(oReparacionesCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ReparacionesBL objetos = new ReparacionesBL();
            return Json(objetos.RecuperaReparacion(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificarReparacion(string nombreReparacion)
        {
            ReparacionesBL objetos = new ReparacionesBL();
            return Json(objetos.VerificarReparacion(nombreReparacion), JsonRequestBehavior.AllowGet);
        }

    }
}