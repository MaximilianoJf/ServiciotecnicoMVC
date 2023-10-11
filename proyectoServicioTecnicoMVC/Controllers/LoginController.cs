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

    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RecuperacionContraseña()
        {
            return View();
        }

        public ActionResult Recuperacion()
        {
            return View();
        }

        public JsonResult loginAutomotriz(string mail, string contra)
        {
            AutomotrizBL oAutomotrizBL = new AutomotrizBL();
            AutomotrizCLS oAutomotrizCLS = oAutomotrizBL.login(mail, contra);
            if (oAutomotrizCLS.ID_Automotriz != 0)
            {
                Session["Automotriz"] = oAutomotrizCLS;
            }
            else
            {
                Session["Automotriz"] = null;
            }
            return Json(oAutomotrizCLS, JsonRequestBehavior.AllowGet);
        }
  

        public ActionResult CerrarSesionAutomotriz()
        {
            Session["Automotriz"] = null;
            Session.Contents.RemoveAll();
            return RedirectToAction("Index", "Login");
        }
        public ActionResult CerrarSesionCliente()
        {
            Session["ClienteWeb"] = null;
            Session.Contents.RemoveAll();
            return RedirectToAction("Index", "Login");
        }

        public JsonResult loginCliente(string mail, string contra)
        {
            ClienteBL oClienteBL = new ClienteBL();
            ClienteCLS oClienteCLS = oClienteBL.login(mail, contra);
            if (oClienteCLS.ID_Cliente != 0)
            {
                Session["ClienteWeb"] = oClienteCLS; 

            }
            else
            {
                Session["ClienteWeb"] = null;
            }
            return Json(oClienteCLS, JsonRequestBehavior.AllowGet);
        }

        public int RegistrarClienteUsuario(string rut, string mail, string usuario, string clave)
        {
            ClienteBL objetos = new ClienteBL();

            return objetos.RegistrarClienteUsuario(rut, mail, usuario, clave);
        }

        public string InvalidSession()
        {
            Session["ClienteWeb"] = null;
            Session["Automotriz"] = null;
            return "Session invalidada";
        }

        public JsonResult filtrar(string rut)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.FiltrarCliente(rut), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarClienteMail(string mail)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.RecuperarClienteMail(mail), JsonRequestBehavior.AllowGet);
        }

    }
}