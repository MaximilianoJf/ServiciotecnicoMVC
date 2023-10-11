using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class EstadoBL
    {
        public List<EstadoCLS> ListarEstado()
        {
            EstadoDAL oEstadoDAL = new EstadoDAL();
            return oEstadoDAL.ListarEstado();
        }
        public List<EstadoCLS> VerificarEstado(string nombreEstado)
        {
            EstadoDAL oEstadoDAL = new EstadoDAL();
            return oEstadoDAL.VerificarEstado(nombreEstado);
        }

        

        public int GuardarEstado(EstadoCLS oEstado)
        {
            EstadoDAL oEstadoDAL = new EstadoDAL();
            return oEstadoDAL.GuardarEstado(oEstado);
        }

        public EstadoCLS RecuperarEstado(int id)
        {
            EstadoDAL oEstadoDAL = new EstadoDAL();
            return oEstadoDAL.RecuperarEstado(id);
        }

        public int EliminarEstado(int id)
        {
            EstadoDAL oEstadoDAL = new EstadoDAL();
            return oEstadoDAL.EliminarEstado(id);
        }



    }
}
