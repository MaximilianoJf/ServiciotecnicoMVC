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
    public class EstadoController : Controller
    {

        public ActionResult formularioEstado()
        {
            return View();
        }

        public JsonResult lista()
        {
            EstadoBL objetos = new EstadoBL();
            return Json(objetos.ListarEstado(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificarEstado(string nombreEstado)
        {
            EstadoBL objetos = new EstadoBL();
            return Json(objetos.VerificarEstado(nombreEstado), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(EstadoCLS oEstadoCLS)
        {
            EstadoBL objetos = new EstadoBL();
            return objetos.GuardarEstado(oEstadoCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            EstadoBL objetos = new EstadoBL();
            return Json(objetos.RecuperarEstado(id), JsonRequestBehavior.AllowGet);
        }

        public int EliminarEstado(int id)
        {
            EstadoBL objetos = new EstadoBL();
            return objetos.EliminarEstado(id);
        }

    }
}