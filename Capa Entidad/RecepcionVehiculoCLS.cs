using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class RecepcionVehiculoCLS
    {
        public int ID_Recepcion { get; set; }

        public int ID_Vehiculo { get; set; }
        public int ID_Pago { get; set; }

        public int ID_Trabajador { get; set; }

        public DateTime Custodia { get; set; }

        public DateTime Fin_Servicio { get; set; }
        public DateTime Inicio_Servicio { get; set; }
        public DateTime Fecha_Recepcion { get; set; }
        public string Bencina { get; set; }
        public string Ubicacion { get; set; }
        public int llave { get; set; }
        public int Documentos { get; set; }
        public int Kilometraje { get; set; }
        public string Observaciones { get; set; }

        public List<int> valor { get; set; }

    }
}
