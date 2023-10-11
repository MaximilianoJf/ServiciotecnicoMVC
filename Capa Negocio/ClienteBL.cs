using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using Capa_Datos;

namespace Capa_Negocio
{
    public class ClienteBL
    { 
        public List<ClienteCLS> ListarCliente()
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.ListarCliente();
        }

        public List<ClienteCLS> FiltrarCliente(string rut)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.FiltrarCliente(rut);
        }

        public ClienteCLS Recuperarcliente(int id)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.RecuperarCliente(id);
        }

        public int GuardarCliente(ClienteCLS oClienteCLS)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.GuardarCliente(oClienteCLS);
        }

        public int ModificarClienteUsu(ClienteCLS oClienteCLS)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.ModificarClienteUsu(oClienteCLS);
        }

        public int EliminarMCliente(int id)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.EliminarCliente(id);
        }

        //public ClienteCLS RecuperarClienteMail(string mail)
        //{
        //    ClienteDAL oClienteDAL = new ClienteDAL();
        //    return oClienteDAL.RecuperarClienteMail(mail);
        //}

        public List<ClienteCLS> RecuperarClienteMail(string mail)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.RecuperarClienteMail(mail);
        }

        public ClienteCLS login(String mail, String contra)
        {
            ClienteDAL ClienteDAL = new ClienteDAL();
            return ClienteDAL.login(mail, contra);
        }

        public int GuardarClienteUsuario(ClienteCLS oClienteCLS)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.GuardarClienteUsuario(oClienteCLS);
        }
    
        public int RandomPass(int id, string pass,string user)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.RandomPass(id,pass,user);
        }

        public int RegistrarClienteUsuario(string rut, string mail, string usuario, string clave)
        {
            AutomotrizDAL oAutomotrizDAL = new AutomotrizDAL();
            AutomotrizCLS oAutomotrizCLS = oAutomotrizDAL.RecuperarAutomotrizRegisterClient();


            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.RegistrarClienteUsuario(oAutomotrizCLS.ID_Automotriz,rut,mail,usuario,clave);
        }
    }
}
