using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;


namespace Capa_Negocio
{
    public class AveriasBL
    {
        public List<AveriasCLS> ListarAverias()
        {
            AveriasDAL oAveriasDAL = new AveriasDAL();
            return oAveriasDAL.ListarAverias();
        }

        public int GuardarAverias(AveriasCLS oAveriasCLS)
        {
            AveriasDAL oAveriasDAL= new AveriasDAL();
            return oAveriasDAL.GuardarAverias(oAveriasCLS);
        }

        public AveriasCLS RecuperarAverias(int id)
        {
            AveriasDAL oAveriasDAL = new AveriasDAL();
            return oAveriasDAL.RecuperarMarca(id);
        }

        public int EliminarAverias(int id)
        {
            AveriasDAL oAveriasDAL = new AveriasDAL();
            return oAveriasDAL.EliminarAverias(id);
        }

        public List<AveriasCLS> VerificarAveria(string nombreAveria)
        {
            AveriasDAL oAveriasDAL = new AveriasDAL();
            return oAveriasDAL.VerificarAveria(nombreAveria);
        }

    }
}
