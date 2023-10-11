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
    public class AutomotrizController : Controller
    {
        // GET: Automotriz
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MenuDocumentos()
        {
            return View();
        }

        public ActionResult MenuGestion()
        {
            return View();
        }

        public ActionResult MenuFormularios()
        {
            return View();
        }
        public int guardarDatos(AutomotrizCLS oAutomotrizCLS)
        {
            AutomotrizBL objetos = new AutomotrizBL();

            EnviarMailController mail = new EnviarMailController();

            int rpta = objetos.GuardarAutomotriz(oAutomotrizCLS);
            mail.SendMailToAdm(oAutomotrizCLS.Mail_Automotriz);
            Session["Automotriz"] = oAutomotrizCLS;
            return rpta;
        }


        public JsonResult RecuperarDatos(int id)
        {
            AutomotrizBL objetos = new AutomotrizBL();
            return Json(objetos.RecuperarAutomotriz(id), JsonRequestBehavior.AllowGet);
        }

    }
}