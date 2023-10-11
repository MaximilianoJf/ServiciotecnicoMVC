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
    public class AveriasController : Controller
    {
        // GET: Averias
        public ActionResult formularioAverias()
        {
            return View();
        }


        public JsonResult lista()
        {
            AveriasBL objetos = new AveriasBL();
            return Json(objetos.ListarAverias(), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(AveriasCLS oAveriasCLS)
        {
            AveriasBL objetos = new AveriasBL();
            return objetos.GuardarAverias(oAveriasCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            AveriasBL objetos = new AveriasBL();
            return Json(objetos.RecuperarAverias(id), JsonRequestBehavior.AllowGet);
        }


        public int EliminarAverias(int id)
        {
            AveriasBL objetos = new AveriasBL();
            return objetos.EliminarAverias(id);
        }

        public JsonResult VerificarAveria(string nombreAveria)
        {
            AveriasBL objetos = new AveriasBL();
            return Json(objetos.VerificarAveria(nombreAveria), JsonRequestBehavior.AllowGet);
        }
    }
}