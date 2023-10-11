using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class DanosBL
    {
 
        public List<DanosCLS> ListarDanosRecepcion(int id)
        {
            DanosDAL oDanosDAL = new DanosDAL();
            return oDanosDAL.ListarDanosRecepcion(id);
        }


        public int GuardarDanos(DanosCLS oDanos)
        {
            DanosDAL oDanosDAL = new DanosDAL();
            return oDanosDAL.GuardarDanos(oDanos);
        }

        public int ModifciarDanos(DanosCLS oDanos)
        {
            DanosDAL oDanosDAL = new DanosDAL();
            return oDanosDAL.ModificarDanos(oDanos);
        }

        public int EliminarDanos(int idR,int idA)
        {
            DanosDAL oDanosDAL = new DanosDAL();
            return oDanosDAL.EliminarDanos(idR,idA);
        }

        public DanosCLS RecuperarDanos(int idR,int idA)
        {
            DanosDAL oDanosDAL = new DanosDAL();
            return oDanosDAL.RecuperarDanos(idR,idA);
        }

    }
}
