using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class MarcaBL
    {
        public List<MarcaCLS> ListarMarca()
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.ListarMarca();
        }



        public List<MarcaCLS> FiltrarMarca(string nombreMarca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.FiltrarMarca(nombreMarca);
        }

        public int GuardarMarca(MarcaCLS oMarca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.GuardarMarca(oMarca);
        }

        public int Guardar(int id,string marca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.Guardar(id, marca);
        }

        public MarcaCLS RecuperarMarca(int id)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.RecuperarMarca(id);
        }

        public int EliminarMarca(int id)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.EliminarMarca(id);
        }

        public List<MarcaCLS> VerificarMarca(string nombreMarca)
        {
            MarcaDAL oMarcaDAL = new MarcaDAL();
            return oMarcaDAL.VerificarMarca(nombreMarca);
        }

    }
}
