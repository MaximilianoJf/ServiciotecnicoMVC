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
    public class PresupuestoController : Controller
    {
        // GET: Presupuesto
        public ActionResult FrmPCliente()
        {
            return View();
        }

        [FrmRCliente]
        public ActionResult FrmPAuto()
        {

            return View();
        }

        public ActionResult FrmPFormulario()
        {
            return View();
        }

        public ActionResult FrmPVista()
        {
            return View();
        }

        public ActionResult FrmPSelect()
        {
            return View();
        }

        public ActionResult FrmPEdit()
        {
            return View();
        }

        public ActionResult FrmPVistaEdit()
        {
            return View();
        }

        public ActionResult FrmPVistaS()
        {
            return View();
        }


        public int GuardarDatos(PresupuestoVehiculoCLS oPresupuestoVehiculoCLS, List<int> valor, List<int> cant, List<string> obs)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            ReparacionPresupuestoBL objetosR = new ReparacionPresupuestoBL();
            oPresupuestoVehiculoCLS.valor = valor;
            oPresupuestoVehiculoCLS.cant = cant;
            oPresupuestoVehiculoCLS.obs = obs;
            int convertKey = objetos.GuardarPresupuesto(oPresupuestoVehiculoCLS);

            Session["Presupuesto"] = objetos.RecuperarPresupuesto(convertKey);
            Session["listaReparaciones"] = objetosR.ListarReparacionPresupuesto(convertKey);

            return convertKey;
        }

        public JsonResult RecuperarDatos(int id)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            return Json(objetos.RecuperarPresupuesto(id), JsonRequestBehavior.AllowGet);

        }

        public JsonResult listaV(int id)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            return Json(objetos.ListarPresupuestoVehiculo(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listaVF(int id, string fecha)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            return Json(objetos.ListarPresupuestoVehiculoFecha(id, fecha), JsonRequestBehavior.AllowGet);
        }

        public int EliminarPresupuesto(int id)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            return objetos.EliminarPresupuesto(id);
        }

        public JsonResult DatosSession(int id)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            MostrarPresupuestoCLS oMostrarPresupuestoCLS = objetos.RecuperarPresupuesto(id);


            if (oMostrarPresupuestoCLS.ID_Presupuesto != 0)
            {
                Session["Presupuesto"] = oMostrarPresupuestoCLS;
            }
            else
            {
                Session["Presupuesto"] = null;
            }



            return Json(oMostrarPresupuestoCLS, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosSessionVer(int id)
        {
            PresupuestoVehiculoBL objetos = new PresupuestoVehiculoBL();
            MostrarPresupuestoCLS oMostrarPresupuestoCLS = objetos.RecuperarPresupuesto(id);
            ReparacionPresupuestoBL objetosR = new ReparacionPresupuestoBL();


            Session["Presupuesto"] = oMostrarPresupuestoCLS;
            Session["listaReparaciones"] = objetosR.ListarReparacionPresupuesto(id);

            return Json(oMostrarPresupuestoCLS, JsonRequestBehavior.AllowGet);
        }

    }

}
