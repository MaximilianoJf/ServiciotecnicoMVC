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
    public class TrabajadorController : Controller
    {
        // GET: Trabajador
        public ActionResult formularioTrabajadores()
        {
            return View();
        }
        public JsonResult lista()
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return Json(objetos.ListarTrabajador(), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(TrabajadorCLS oTrabajadorCLS)
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return objetos.GuardarTrabajador(oTrabajadorCLS);
        }

        public int EliminarTrabajador(int id)
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return objetos.EliminarTrabajador(id);
        }

        public JsonResult RecuperarDatos(int id)
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return Json(objetos.RecuperarTrabajador(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificartrabajadorRut(string rut)
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return Json(objetos.VerificarTrabajadorRut(rut), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificartrabajadorMail(string mail)
        {
            TrabajadorBL objetos = new TrabajadorBL();
            return Json(objetos.VerificarTrabajadorMail(mail), JsonRequestBehavior.AllowGet);
        }

    }
}