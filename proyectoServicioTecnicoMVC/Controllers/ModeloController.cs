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
    public class ModeloController : Controller
    {
        // GET: Modelo
        public ActionResult formularioModelo()
        {
            return View();
        }

        public JsonResult RecuperarDatos(int id)
        {
            ModeloBL objetos = new ModeloBL();
            return Json(objetos.RecuperarModelo(id), JsonRequestBehavior.AllowGet);
        }


        public JsonResult listaModeloMarca(int id)
        {
            ModeloBL objetos = new ModeloBL();
            return Json(objetos.ListarModeloMarca(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerificarModelo(string nombreModelo)
        {
            ModeloBL objetos = new ModeloBL();
            return Json(objetos.VerificarModelo(nombreModelo), JsonRequestBehavior.AllowGet);
        }

        public int guardarDatos(ModeloCLS oModeloCLS)
        {
            ModeloBL objetos = new ModeloBL();
            return objetos.GuardarModelo(oModeloCLS);
        }

        public int EliminarModelo(int id)
        {
            ModeloBL objetos = new ModeloBL();
            return objetos.EliminarModelo(id);
        }
    }
}