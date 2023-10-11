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
    public class VehiculoController : Controller
    {
        // GET: Vehiculo
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult formularioAuto()
        {
            return View();
        }

        public JsonResult listarVehiculoPorCliente(int idCliente)
        {
            VehiculoBL objetos = new VehiculoBL();
            return Json(objetos.listarVehiculoPorCliente(idCliente), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarVehiculo(int id)
        {
            VehiculoBL objetos = new VehiculoBL();
            return Json(objetos.RecuperarVehiculo(id), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(VehiculoCLS oVehiculoCLS)
        {
            VehiculoBL objetos = new VehiculoBL();
            return objetos.GuardarVehiculo(oVehiculoCLS);
        }

        public int EliminarVehiculo(int id)
        {
            VehiculoBL objetos = new VehiculoBL();
            return objetos.EliminarVehiculo(id);
        }

        public JsonResult verificarPatente(string patente)
        {
            VehiculoBL objetos = new VehiculoBL();
            return Json(objetos.verificarPatente(patente), JsonRequestBehavior.AllowGet);
        }

        [FrmRCliente]
        public JsonResult DatosSession(int id)
        {
            VehiculoBL objetos = new VehiculoBL();
            VehiculoCLS oVehiculoCLS = objetos.RecuperarVehiculo(id);


            if (oVehiculoCLS.ID_Vehiculo != 0)
            {
                Session["Vehiculo"] = oVehiculoCLS;
            }
            else
            {
                Session["Vehiculo"] = null;
            }

            int idM = oVehiculoCLS.ID_Marca;
            MarcaBL marca = new MarcaBL();
            Session["Marca"] = marca.RecuperarMarca(idM);


            return Json(oVehiculoCLS, JsonRequestBehavior.AllowGet);
        }



    }
}