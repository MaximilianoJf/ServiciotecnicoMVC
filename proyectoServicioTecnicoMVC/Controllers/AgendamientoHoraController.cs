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
    public class AgendamientoHoraController : Controller
    {

        public int EliminarExpiradas()
        {
            AgendamientoHoraBL objetos = new AgendamientoHoraBL();
            return objetos.EliminarExpiradas();
        }
    }
}