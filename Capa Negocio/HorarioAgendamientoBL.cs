using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class HorarioAgendamientoBL
    {
        public List<MostrarSolicitudCLS> ListarSolicitudFecha(string fecha)
        {
            HorarioAgendamientoDAL oHorarioAgendamientoDAL = new HorarioAgendamientoDAL();
            return oHorarioAgendamientoDAL.ListarSolicitudFecha(fecha);
        }

        public List<MostrarSolicitudCLS> ListarSolicitudCliente(string id)
        {
            HorarioAgendamientoDAL oHorarioAgendamientoDAL = new HorarioAgendamientoDAL();
            return oHorarioAgendamientoDAL.ListarSolicitudCliente(id);
        }
    }
}
