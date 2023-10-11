using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class AgendamientoHoraBL
    {
        public int GuardarAgendamientoHora(int id, int idC, int idH, DateTime fecha)
        {
            AgendamientoHoraDAL oAgendamientoHoraDAL = new AgendamientoHoraDAL();
            return oAgendamientoHoraDAL.GuardarAgendamientoHora(id,idC,idH,fecha);
        }

        public int CancelarAgendamientoHora(int id, int estado)
        {
            AgendamientoHoraDAL oAgendamientoHoraDAL = new AgendamientoHoraDAL();
            return oAgendamientoHoraDAL.CancelarAgendamientoHora(id, estado);
        }

        public int EliminarExpiradas()
        {
            AgendamientoHoraDAL oAgendamientoHoraDAL = new AgendamientoHoraDAL();
            return oAgendamientoHoraDAL.EliminarExpiradas();
        }
    }
}
