using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class HorarioAtencionCLS
    {
      
        public int ID_Horario { get; set; }
        public DateTime Hora_Inicio { get; set; }
        public DateTime Hora_Fin { get; set; }
        public string Dia_Semanal { get; set; }
    }
}

