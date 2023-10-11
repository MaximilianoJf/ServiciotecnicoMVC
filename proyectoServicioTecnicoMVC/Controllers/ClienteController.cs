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
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult formularioCliente()
        {
            return View();
        }

        public ActionResult lista()
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.ListarCliente(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrar(string rut)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.FiltrarCliente(rut), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.Recuperarcliente(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosSession(int id)
        {
            ClienteBL objetos = new ClienteBL();
            ClienteCLS oClienteCLS = objetos.Recuperarcliente(id);


            if (oClienteCLS.ID_Cliente != 0)
            {
                Session["Cliente"] = oClienteCLS;
            }
            else
            {
                Session["Cliente"] = null;
            }



            return Json(oClienteCLS, JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(ClienteCLS oClienteCLS)
        {
            ClienteBL objetos = new ClienteBL();
            return objetos.GuardarCliente(oClienteCLS);
        }

        public int ModificarClienteUsu(ClienteCLS oClienteCLS)
        {

            ClienteBL objetos = new ClienteBL();
            ClienteCLS oCliente = new ClienteCLS();
            oCliente = objetos.Recuperarcliente(oClienteCLS.ID_ClienteU);
            int rpta = objetos.ModificarClienteUsu(oClienteCLS);
            EnviarMailController mail = new EnviarMailController();
            mail.SendMailToUser(oCliente.Mail_Cliente);

            return rpta;
        }
        public int EliminarCliente(int id)
        {
            ClienteBL objetos = new ClienteBL();
            return objetos.EliminarMCliente(id);
        }

        public JsonResult RecuperarClienteMail(string mail)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.RecuperarClienteMail(mail), JsonRequestBehavior.AllowGet);
        }

    }
}