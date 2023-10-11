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
    public class MarcaController : Controller
    {
        // GET: Marca
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult formularioMarca()
        {
            return View();
        }


        public JsonResult lista()
        {
            MarcaBL objetos = new MarcaBL();
            return Json(objetos.ListarMarca(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrar(string nombreMarca)
        {
            MarcaBL objetos = new MarcaBL();
            return Json(objetos.FiltrarMarca(nombreMarca), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificarMarca(string nombreMarca)
        {
            MarcaBL objetos = new MarcaBL();
            return Json(objetos.VerificarMarca(nombreMarca), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(MarcaCLS oMarcaCLS)
        {
            MarcaBL objetos = new MarcaBL();
            return objetos.GuardarMarca(oMarcaCLS);
        }

        public int guardar(int id, string marca)
        {
            MarcaBL objetos = new MarcaBL();
            return objetos.Guardar(id, marca);
        }


        public JsonResult RecuperarDatos(int id)
        {
            MarcaBL objetos = new MarcaBL();
            return Json(objetos.RecuperarMarca(id),JsonRequestBehavior.AllowGet);
        }


        public int EliminarMarca(int id)
        {
            MarcaBL objetos = new MarcaBL();
            return objetos.EliminarMarca(id);
        }

        public JsonResult DatosSession(int id)
        {
            MarcaBL objetos= new MarcaBL();

            MarcaCLS oMarcaCLS = objetos.RecuperarMarca(id);


            if (oMarcaCLS.ID_Marca != 0)
            {
                Session["Marca"] = oMarcaCLS;
            }
            else
            {
                Session["Marca"] = null;
            }


            return Json(oMarcaCLS, JsonRequestBehavior.AllowGet);
        }


    }
}