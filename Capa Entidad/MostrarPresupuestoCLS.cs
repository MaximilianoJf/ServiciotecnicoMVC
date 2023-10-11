using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class MostrarPresupuestoCLS
    {
        public int ID_Presupuesto { get; set; }
        public int ID_Vehiculo { get; set; }
        public string Observaciones { get; set; }
        public string Validez { get; set; }
        public string Fecha_Presupuesto { get; set; }

        /*Lectura inner join*/
        public string Modelo_Marca { get; set; }
    }
}
