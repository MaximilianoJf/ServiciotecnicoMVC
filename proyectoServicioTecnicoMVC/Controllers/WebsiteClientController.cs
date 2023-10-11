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
    [SerguridadC]
    public class WebsiteClientController : Controller
    {
        // GET: WebsiteClient
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AgendamientoHora()
        {
            return View();
        }

        public ActionResult Solicitud()
        {
            return View();
        }





        public JsonResult RecuperarClienteMail(string mail)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.RecuperarClienteMail(mail), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarHorarioDia(string dia)
        {
            HorarioAtencionBL objetos = new HorarioAtencionBL();
            return Json(objetos.ListarHorarioDia(dia), JsonRequestBehavior.AllowGet);
        }


        public int guardarAgendamiento(int id, int idC, int idH, DateTime fecha)
        {
            AgendamientoHoraBL objetos = new AgendamientoHoraBL();
            return objetos.GuardarAgendamientoHora(id, idC, idH, fecha);
        }


        public JsonResult ListarSolicitudFecha(string fecha)
        {
            HorarioAgendamientoBL objetos = new HorarioAgendamientoBL();
            return Json(objetos.ListarSolicitudFecha(fecha), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Recuperarsolicitudcliente(string id)
        {
            HorarioAgendamientoBL objetos = new HorarioAgendamientoBL();
            return Json(objetos.ListarSolicitudCliente(id), JsonRequestBehavior.AllowGet);
        }

        public int CancelarAgendamientoHora(int id, int estado)
        {
            AgendamientoHoraBL objetos = new AgendamientoHoraBL();
            return objetos.CancelarAgendamientoHora(id, estado);
        }

        public JsonResult RecuperarDatos(int id)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.Recuperarcliente(id), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(ClienteCLS oClienteCLS)
        {
            ClienteBL objetos = new ClienteBL();

            EnviarMailController mail = new EnviarMailController();

            int rpta = objetos.GuardarClienteUsuario(oClienteCLS);
            mail.SendMailToUser(oClienteCLS.Mail_Cliente);
            Session["ClienteWeb"] = oClienteCLS;
            return rpta;
        }

        public JsonResult filtrar(string rut)
        {
            ClienteBL objetos = new ClienteBL();
            return Json(objetos.FiltrarCliente(rut), JsonRequestBehavior.AllowGet);
        }

  

        //public JsonResult RecuperarAutomotrizRegisterClient()
        //{
        //    AutomotrizBL objetos = new AutomotrizBL();
        //    return Json(objetos.RecuperarAutomotrizRegisterClient(), JsonRequestBehavior.AllowGet);
        //}

    }
}