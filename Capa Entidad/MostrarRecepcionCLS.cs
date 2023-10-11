using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
     public class MostrarRecepcionCLS
    {
        public int ID_Recepcion { get; set; }

        public int ID_Vehiculo { get; set; }
        public int ID_Pago { get; set; }

        public int ID_Trabajador { get; set; }

        public string Custodia { get; set; }
        public string Inicio_Servicio { get; set; }
        public string Fecha_Recepcion { get; set; }
        public string Fin_Servicio { get; set; }
        public string Bencina { get; set; }
        public string Ubicacion { get; set; }
        public int llave { get; set; }
        public int Documentos { get; set; }
        public int Kilometraje { get; set; }
        public string Observaciones { get; set; }

        /*Lectura inner join*/
        public string Modelo_Marca { get; set; }
        public string Estado_Pago { get; set; }

    }
}
