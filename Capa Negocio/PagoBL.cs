using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class PagoBL
    {
        public List<PagoCLS> ListarPago()
        {
            PagoDAL oPagoDAL = new PagoDAL();
            return oPagoDAL.ListarPago();
        }

    }
}
