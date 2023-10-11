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
    public class RecepcionController : Controller
    { 
        
        
        // GET: Recepcion
        public ActionResult FrmRCliente()
        {
           

            return View();
        }

        [FrmRCliente]
        public ActionResult FrmRAuto()
        {
 
            return View();
        }

        [FrmRAuto]
        public ActionResult FrmRFormulario()
        {
            return View();
        }

        [FrmRFormulario]
        public ActionResult FrmRAverias()
        {
            return View();
        }
        [FrmRAverias]
        public ActionResult FrmRVista()
        {
            return View();
        }

        public ActionResult FrmRSelect()
        {
            return View();
        }

        public ActionResult FrmREdit()
        {
            return View();
        }

        public ActionResult FrmRAvEdit()
        {
            return View();
        }
        public ActionResult FrmRVistaEdit()
        {
            return View();
        }
        public ActionResult FrmRVistaS()
        {
            return View();
        }

        public JsonResult lista()
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return Json(objetos.ListarRecepcion(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listaV(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return Json(objetos.ListarRecepcionVehiculo(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listaVF(int id, string fecha)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return Json(objetos.ListarRecepcionVehiculoFecha(id, fecha), JsonRequestBehavior.AllowGet);
        }


        public int GuardarDatos(RecepcionVehiculoCLS oRecepcionVehiculoCLS, List<int> valor)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            oRecepcionVehiculoCLS.valor = valor;
            int convertKey = objetos.GuardarRecepcion(oRecepcionVehiculoCLS);
        
            Session["Recepcion"] = objetos.RecuperarRecepcion(convertKey);
            Session["RecepcionEquipamiento"] = objetos.ListarRecepcionEquipemiento(convertKey);
            

            return convertKey;
        }

        public int EditarDatos(RecepcionVehiculoCLS oRecepcionVehiculoCLS, List<int> valor)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            oRecepcionVehiculoCLS.valor = valor;
            int convertKey = objetos.GuardarRecepcion(oRecepcionVehiculoCLS);

            Session["Recepcion"] = objetos.RecuperarRecepcion(convertKey);
            Session["RecepcionEquipamiento"] = objetos.ListarRecepcionEquipemiento(convertKey);


            return convertKey;
        }

        public JsonResult RecuperarDatos(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return Json(objetos.RecuperarRecepcion(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listaRE(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return Json(objetos.ListarRecepcionEquipemiento(id), JsonRequestBehavior.AllowGet);
        }

        public int EliminarRecepcion(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            return objetos.EliminarRecepcion(id);
        }
        public JsonResult DatosSession(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            MostrarRecepcionCLS oMostrarRecepcionCLS = objetos.RecuperarRecepcion(id);


            if (oMostrarRecepcionCLS.ID_Recepcion != 0)
            {
                Session["Recepcion"] = oMostrarRecepcionCLS;
            }
            else
            {
                Session["Recepcion"] = null;
            }



            return Json(oMostrarRecepcionCLS, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosSessionVer(int id)
        {
            RecepcionVehiculoBL objetos = new RecepcionVehiculoBL();
            MostrarRecepcionCLS oMostrarRecepcionCLS = objetos.RecuperarRecepcion(id);


            if (oMostrarRecepcionCLS.ID_Recepcion != 0)
            {
                Session["Recepcion"] = oMostrarRecepcionCLS;
            }
            else
            {
                Session["Recepcion"] = null;
            }

            DanosBL objetosR = new DanosBL();
            List<DanosCLS> oDanosCLS = objetosR.ListarDanosRecepcion(id);
            Session["listaDanos"] = oDanosCLS;

      
            Session["RecepcionEquipamiento"] = objetos.ListarRecepcionEquipemiento(id);


            return Json(oMostrarRecepcionCLS, JsonRequestBehavior.AllowGet);
        }

    }

}