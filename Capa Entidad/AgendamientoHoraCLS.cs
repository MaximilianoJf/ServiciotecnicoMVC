using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class AgendamientoHoraCLS
    {
        public int ID_Agendamiento { get; set; }
        public int ID_Cliente { get; set; }
        public DateTime Fecha_Agendamiento { get; set; }
        public int Estado_Agendamiento { get; set; }
    }
}
