using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class RecepcionVehiculoBL
    {

        public List<MostrarRecepcionCLS> ListarRecepcion()
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.ListarRecepcion();
        }

        public List<MostrarRecepcionCLS> ListarRecepcionVehiculo(int id)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.ListarRecepcionVehiculo(id);
        }


        public List<MostrarRecepcionCLS> ListarRecepcionVehiculoFecha(int id,string Fecha)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.ListarRecepcionVehiculoFecha(id, Fecha);
        }

        public int GuardarRecepcion(RecepcionVehiculoCLS oRecepcionVehiculo)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.GuardarRecepcion(oRecepcionVehiculo);
        }

        public MostrarRecepcionCLS RecuperarRecepcion(int id)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.RecuperarRecepcion(id);
        }

        public List<EquipamientoCLS> ListarRecepcionEquipemiento(int id)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.ListarRecepcionEquipamiento(id);
        }

        public int EliminarRecepcion(int id)
        {
            RecepcionVehiculoDAL oRecepcionVehiculoDAL = new RecepcionVehiculoDAL();
            return oRecepcionVehiculoDAL.EliminarRecepcion(id);
        }
    }
}
