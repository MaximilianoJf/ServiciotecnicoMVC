using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class ModeloBL
    {

        public List<ModeloCLS> ListarModeloMarca(int id)
        {
            ModeloDAL oModeloDAL = new ModeloDAL();
            return oModeloDAL.ListarModeloMarca(id);
        }

        public List<ModeloCLS> VerificarModelo(string nombreModelo)
        {
            ModeloDAL oModeloDAL = new ModeloDAL();
            return oModeloDAL.VerificarModelo(nombreModelo);
        }

        public ModeloCLS RecuperarModelo(int id)
        {
            ModeloDAL oModeloDAL = new ModeloDAL();
            return oModeloDAL.RecuperarModelo(id);
        }

          public int GuardarModelo(ModeloCLS oModelo)
        {
            ModeloDAL oModeloDAL = new ModeloDAL();
            return oModeloDAL.GuardarModelo(oModelo);
        }

        public int EliminarModelo(int id)
        {
            ModeloDAL oModeloDAL = new ModeloDAL();
            return oModeloDAL.EliminarModelo(id);
        }
    }
}
