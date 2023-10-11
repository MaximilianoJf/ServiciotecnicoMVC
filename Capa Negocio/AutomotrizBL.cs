using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class AutomotrizBL
    {
        public AutomotrizCLS login(String mail, String contra)
        {
            AutomotrizDAL AutomotrizDAL = new AutomotrizDAL();
            return AutomotrizDAL.login(mail, contra);
        }

        public int GuardarAutomotriz(AutomotrizCLS oAutomotriz)
        {
            AutomotrizDAL oMarcaAutomotriz= new AutomotrizDAL();
            return oMarcaAutomotriz.ModificarAutomotriz(oAutomotriz);
        }

        public AutomotrizCLS RecuperarAutomotriz(int id)
        {
            AutomotrizDAL oAutomotrizDAL = new AutomotrizDAL();
            return oAutomotrizDAL.RecuperarAutomotriz(id);
        }

        public AutomotrizCLS RecuperarAutomotrizRegisterClient()
        {
            AutomotrizDAL oAutomotrizDAL = new AutomotrizDAL();
            return oAutomotrizDAL.RecuperarAutomotrizRegisterClient();
        }

    }
}
