using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace proyectoServicioTecnicoMVC.Controllers
{
    public class HorarioAtencionController : Controller
    {
        // GET: HorarioAtencion
        public ActionResult Horario()
        {
            return View();
        }

        public JsonResult ListarHorarioDia(string dia)
        {
            HorarioAtencionBL objetos = new HorarioAtencionBL();
            return Json(objetos.ListarHorarioDia(dia), JsonRequestBehavior.AllowGet);
        }

        public int EliminarHorario(int id)
        {
            HorarioAtencionBL objetos = new HorarioAtencionBL();
            return objetos.EliminarHorario(id);
        }

        public int guardarDatos(HorarioAtencionCLS oHorarioAtencionCLS)
        {
            HorarioAtencionBL objetos = new HorarioAtencionBL();
            return objetos.GuardarHorario(oHorarioAtencionCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            HorarioAtencionBL objetos = new HorarioAtencionBL();
            return Json(objetos.RecuperarHorario(id), JsonRequestBehavior.AllowGet);
        }

    }
}