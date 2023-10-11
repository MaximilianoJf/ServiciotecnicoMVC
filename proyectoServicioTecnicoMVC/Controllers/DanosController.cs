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
    public class DanosController : Controller
    {

        public JsonResult lista(int id)
        {
            DanosBL objetos = new DanosBL();
            return Json(objetos.ListarDanosRecepcion(id), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(DanosCLS oDanosCLS)
        {
            DanosBL objetos = new DanosBL();
            return objetos.GuardarDanos(oDanosCLS);
        }

        public int ModificarDatos(DanosCLS oDanosCLS)
        {
            DanosBL objetos = new DanosBL();
            return objetos.ModifciarDanos(oDanosCLS);
        }


        public int Eliminar(int idR,int idA)
        {
            DanosBL objetos = new DanosBL();
            return objetos.EliminarDanos(idR,idA);
        }

        public JsonResult RecuperarDatos(int idR,int idA)
        {
            DanosBL objetos = new DanosBL();
            return Json(objetos.RecuperarDanos(idR,idA), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DatosSession(int id)
        {
            DanosBL objetos = new DanosBL();
            List<DanosCLS> lista = objetos.ListarDanosRecepcion(id); 

            Session["listaDanos"] = lista;
            



            return Json(lista, JsonRequestBehavior.AllowGet);
        }


    }
}