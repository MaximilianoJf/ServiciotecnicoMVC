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
    public class EquipamientoController : Controller
    {
        // GET: Equipamiento
        public ActionResult formularioEquipamiento()
        {
            return View();
        }

        public JsonResult lista()
        {
            EquipamientoBL objetos = new EquipamientoBL();
            return Json(objetos.ListarEquipamiento(), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(EquipamientoCLS oEquipamientoCLS)
        {
            EquipamientoBL objetos = new EquipamientoBL();
            return objetos.GuardarEquipamiento(oEquipamientoCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            EquipamientoBL objetos = new EquipamientoBL();
            return Json(objetos.RecuperarEquipamiento(id), JsonRequestBehavior.AllowGet);
        }


        public int EliminarEquipamiento(int id)
        {
            EquipamientoBL objetos = new EquipamientoBL();
            return objetos.EliminarEquipamiento(id);
        }

        public JsonResult VerificarEquipamiento(string nombreEquipamiento)
        {
            EquipamientoBL objetos = new EquipamientoBL();
            return Json(objetos.VerificarEquipamiento(nombreEquipamiento), JsonRequestBehavior.AllowGet);
        }

    }
}