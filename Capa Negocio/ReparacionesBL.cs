using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;


namespace Capa_Negocio
{
    public class ReparacionesBL
    {
        public List<ReparacionesCLS> ListarReparaciones()
        {
            ReparacionesDAL oReparacionesDAL = new ReparacionesDAL();
            return oReparacionesDAL.ListarReparaciones();
        }

        public int EliminarReparacion(int id)
        {
            ReparacionesDAL oReparacionesDAL = new ReparacionesDAL();
            return oReparacionesDAL.EliminarReparacion(id);
        }

        public int GuardarReparacion(ReparacionesCLS oReparaciones)
        {
            ReparacionesDAL oReparacionesDAL = new ReparacionesDAL();
            return oReparacionesDAL.GuardarReaparacion(oReparaciones);
        }

        public ReparacionesCLS RecuperaReparacion(int id)
        {
            ReparacionesDAL oReparacionesDAL = new ReparacionesDAL();
            return oReparacionesDAL.RecuperarReparacion(id);
        }

        public List<ReparacionesCLS> VerificarReparacion(string nombreReparacion)
        {
            ReparacionesDAL oReparacionesDAL = new ReparacionesDAL();
            return oReparacionesDAL.VerificarReparacion(nombreReparacion);
        }

    }
}
