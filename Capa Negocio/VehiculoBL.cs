using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class VehiculoBL
    {
        public List<VehiculoCLS> listarVehiculoPorCliente(int idCliente)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.listarVehiculoPorCliente(idCliente);
        }


        public VehiculoCLS RecuperarVehiculo(int id)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.RecuperarVehiculo(id);
        }


        public int GuardarVehiculo(VehiculoCLS oVehiculo)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.GuardarVehiculo(oVehiculo);
        }

        public int EliminarVehiculo(int id)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.EliminarVehiculo(id);
        }

        public List<VehiculoCLS> verificarPatente(string patente)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.verificarPatente(patente);
        }
   

    }
}
