using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class TipoVehiculoBL
    {
        public List<TipoVehiculoCLS> listarTipoV()
        {
            TipoVehiculoDAL oTipoVehiculoDAL = new TipoVehiculoDAL();
            return oTipoVehiculoDAL.ListarTipoVehiculo();
        }

        public int GuardarTipoVehiculo(TipoVehiculoCLS oTipoVehiculo)
        {
            TipoVehiculoDAL oTipoVehiculoDAL = new TipoVehiculoDAL();
            return oTipoVehiculoDAL.GuardarTipoVehiculo(oTipoVehiculo);
        }

        public TipoVehiculoCLS RecuperarTipoVehiculo(int id)
        {
            TipoVehiculoDAL oTipoVehiculoDAL = new TipoVehiculoDAL();
            return oTipoVehiculoDAL.RecuperarTipoVehiculo(id);
        }

        public int EliminarTipoVehiculo(int id)
        {
            TipoVehiculoDAL oTipoVehiculoDAL = new TipoVehiculoDAL();
            return oTipoVehiculoDAL.EliminarTipoVehiculo(id);
        }

        public List<TipoVehiculoCLS> VerificarTipo(string nombreTipo)
        {
            TipoVehiculoDAL oTipoVehiculoDAL = new TipoVehiculoDAL();
            return oTipoVehiculoDAL.VerificarTipo(nombreTipo);
        }
    }
}
