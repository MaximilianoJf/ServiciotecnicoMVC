using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class ReparacionPresupuestoCLS
    {
        public int ID_Presupuesto { get; set; }
        public int ID_Reparacion { get; set; }

        public string Detalle { get; set; }
        public int Valor { get; set; }

        public int Cantidad { get; set; }
        public string Observacion { get; set; }
    }
}
