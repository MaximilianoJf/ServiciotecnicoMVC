using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class HorarioAtencionBL
    {

        public List<MostrarHorarioCLS> ListarHorarioDia(string dia)
        {
            HorarioAtencionDAL oHorarioAtencionDAL = new HorarioAtencionDAL();
            return oHorarioAtencionDAL.ListarHorarioDia(dia);
        }

        public int EliminarHorario(int id)
        {
            HorarioAtencionDAL oHorarioAtencionDAL = new HorarioAtencionDAL();
            return oHorarioAtencionDAL.EliminarHorario(id);
        }

        public int GuardarHorario(HorarioAtencionCLS oHorarioAtencion)
        {
            HorarioAtencionDAL oHorarioAtencionDAL = new HorarioAtencionDAL();
            return oHorarioAtencionDAL.GuardarHorario(oHorarioAtencion);
        }

        public MostrarHorarioCLS RecuperarHorario(int id)
        {
            HorarioAtencionDAL oHorarioAtencionDAL = new HorarioAtencionDAL();
            return oHorarioAtencionDAL.RecuperarHorario(id);
        }




    }
}
