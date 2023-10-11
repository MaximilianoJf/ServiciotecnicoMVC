using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class VehiculoCLS
    {
        public int ID_Vehiculo { get; set; }
        public int ID_Modelo { get; set; }
        public int ID_Cliente { get; set; }
        public int ID_Estado { get; set; }
        public int ID_TipoVehiculo { get; set; }
        public int ID_Marca { get; set; }
        public string Patente { get; set; }
        public int Ano_Vehiculo { get; set; }
        public string Color { get; set; }

        public string Nombre_Cliente { get; set; }
        public string Nombre_Modelo { get; set; }
        public string Nombre_Marca { get; set; }
        public string Nombre_Estado { get; set; }
        public string Producto { get; set; }
    }
}
