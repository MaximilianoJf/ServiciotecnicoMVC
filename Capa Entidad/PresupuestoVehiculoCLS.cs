using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class PresupuestoVehiculoCLS
    {
        public int ID_Presupuesto { get; set; }
        public int ID_Vehiculo { get; set; }
        public string Observaciones { get; set; }
        public DateTime Validez { get; set; }
        public DateTime Fecha_Presupuesto { get; set; }

        public List<int> valor { get; set; }
        public List<int> cant { get; set; }
        public List<string> obs { get; set; }
    }
}
