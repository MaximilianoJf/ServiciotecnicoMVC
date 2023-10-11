using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class TrabajadorBL
    {

        public List<TrabajadorCLS> ListarTrabajador()
        {
            TrabajadorDAL oTrabajadorDAL = new TrabajadorDAL();
            return oTrabajadorDAL.ListarTrabajador();
        }

        public int GuardarTrabajador(TrabajadorCLS oTrabajador)
        {
            TrabajadorDAL oTrabajadoDAL = new TrabajadorDAL();
            return oTrabajadoDAL.GuardarTrabajador(oTrabajador);
        }
        public int EliminarTrabajador(int id)
        {
            TrabajadorDAL oTrabajadorDAL = new TrabajadorDAL();
            return oTrabajadorDAL.EliminarTrabajador(id);
        }

        public TrabajadorCLS RecuperarTrabajador(int id)
        {
            TrabajadorDAL oTrabajadorDAL = new TrabajadorDAL();
            return oTrabajadorDAL.RecuperarTrabajador(id);
        }

        public List<TrabajadorCLS> VerificarTrabajadorRut(string rut)
        {
            TrabajadorDAL oTrabajadorDAL = new TrabajadorDAL();
            return oTrabajadorDAL.VerificarTrabajadorRut(rut);
        }

        public List<TrabajadorCLS> VerificarTrabajadorMail(string mail)
        {
            TrabajadorDAL oTrabajadorDAL = new TrabajadorDAL();
            return oTrabajadorDAL.VerificarTrabajadorMail(mail);
        }
    }
}
