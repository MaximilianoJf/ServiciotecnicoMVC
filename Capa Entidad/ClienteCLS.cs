using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class ClienteCLS
    {
        public int ID_Cliente { get; set; }
        public int ID_Automotriz { get; set; }
        public string Nombre_Cliente { get; set; }
        public int Fono_Cliente { get; set; }
        public string Rut_Cliente { get; set; }
        public string Mail_Cliente { get; set; }
        public string Direccion_Cliente { get; set; }
        public int ID_ClienteU { get; set; }
        public string Usuario_Cliente { get; set; }
        public string Clave_Cliente { get; set; }
    }
}
