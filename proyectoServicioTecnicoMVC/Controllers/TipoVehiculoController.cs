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
    public class TipoVehiculoController : Controller
    {
   

        public JsonResult lista()
        {
            TipoVehiculoBL objetos = new TipoVehiculoBL();
            return Json(objetos.listarTipoV(), JsonRequestBehavior.AllowGet);
        }
        public int guardarDatos(TipoVehiculoCLS oTipoVehiculoCLS)
        {
            TipoVehiculoBL objetos = new TipoVehiculoBL();
            return objetos.GuardarTipoVehiculo(oTipoVehiculoCLS);
        }

        public JsonResult RecuperarDatos(int id)
        {
            TipoVehiculoBL objetos = new TipoVehiculoBL();
            return Json(objetos.RecuperarTipoVehiculo(id), JsonRequestBehavior.AllowGet);
        }

        public ActionResult formularioTipoVehiculo()
        {
            return View();
        }


        public int EliminarTipoVehiculo(int id)
        {
            TipoVehiculoBL objetos = new TipoVehiculoBL();
            return objetos.EliminarTipoVehiculo(id);
        }


        public JsonResult VerificarTipo(string nombreTipo)
        {
            TipoVehiculoBL objetos = new TipoVehiculoBL();
            return Json(objetos.VerificarTipo(nombreTipo), JsonRequestBehavior.AllowGet);
        }
    }
}
