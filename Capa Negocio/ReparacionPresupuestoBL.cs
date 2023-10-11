using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;


namespace Capa_Negocio
{
    public class ReparacionPresupuestoBL
    {
        public List<ReparacionPresupuestoCLS> ListarReparacionPresupuesto(int id)
        {
            ReparacionPresupuestoDAL oReparacionPresupuestoDAL = new ReparacionPresupuestoDAL();
            return oReparacionPresupuestoDAL.ListarReparacionPresupuesto(id);
        }
    }
}
