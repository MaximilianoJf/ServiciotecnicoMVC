using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class PresupuestoVehiculoBL
    {
        public int GuardarPresupuesto(PresupuestoVehiculoCLS oPresupuestoVehiculoCLS)
        {
            PresupuestoVehiculoDAL oPresupuestoVehiculoDAL = new PresupuestoVehiculoDAL();
            return oPresupuestoVehiculoDAL.GuardarPresupuesto(oPresupuestoVehiculoCLS);
        }

        public MostrarPresupuestoCLS RecuperarPresupuesto(int id)
        {
            PresupuestoVehiculoDAL oPresupuestoVehiculoDAL = new PresupuestoVehiculoDAL();
            return oPresupuestoVehiculoDAL.RecuperarPresupuesto(id);
        }

        public List<MostrarPresupuestoCLS> ListarPresupuestoVehiculo(int id)
        {
            PresupuestoVehiculoDAL oPresupuestoVehiculoDAL = new PresupuestoVehiculoDAL();
            return oPresupuestoVehiculoDAL.ListarPresupuestoVehiculo(id);
        }

        public List<MostrarPresupuestoCLS> ListarPresupuestoVehiculoFecha(int id, string Fecha)
        {
            PresupuestoVehiculoDAL oPresupuestoVehiculoDAL = new PresupuestoVehiculoDAL();
            return oPresupuestoVehiculoDAL.ListarPresupuestoVehiculoFecha(id, Fecha);
        }
        public int EliminarPresupuesto(int id)
        {
            PresupuestoVehiculoDAL oPresupuestoVehiculoDAL = new PresupuestoVehiculoDAL();
            return oPresupuestoVehiculoDAL.EliminarPresupuesto(id);
        }

    }
}
