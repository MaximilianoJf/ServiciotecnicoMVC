using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class EquipamientoBL
    {

        public List<EquipamientoCLS> ListarEquipamiento()
        {
            EquipamientoDAL oEquipamientoDAL = new EquipamientoDAL();
            return oEquipamientoDAL.listarEquipamiento();
        }

        public int GuardarEquipamiento(EquipamientoCLS oEquipamiento)
        {
            EquipamientoDAL oEquipamientoDAL = new EquipamientoDAL();
            return oEquipamientoDAL.GuardarEquipamiento(oEquipamiento);
        }

        public EquipamientoCLS RecuperarEquipamiento(int id)
        {
            EquipamientoDAL oEquipamientoDAL = new EquipamientoDAL();
            return oEquipamientoDAL.RecuperarEquipamiento(id);
        }

        public int EliminarEquipamiento(int id)
        {
            EquipamientoDAL oEquipamientoDAL = new EquipamientoDAL();
            return oEquipamientoDAL.EliminarEquipamiento(id);
        }
        public List<EquipamientoCLS> VerificarEquipamiento(string nombreEquipamiento)
        {
            EquipamientoDAL oEquipamientoDAL = new EquipamientoDAL();
            return oEquipamientoDAL.VerificarEquipamiento(nombreEquipamiento);
        }
    }
}
