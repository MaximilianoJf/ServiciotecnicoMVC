using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class MostrarSolicitudCLS
    {
        public int ID_Agendamiento{ get; set; }
        public int ID_Horario { get; set; }

        public int ID_Cliente { get; set; }
        public string Hora_Inicio { get; set; }
        public string Hora_Fin { get; set; }

        public string Fecha_Agendamiento { get; set; }
        public int Fono_Cliente { get; set; }
        public string Nombre_Cliente { get; set; }
        public string Dia_Semanal { get; set; }
        public int Estado { get; set; }
    }
}
