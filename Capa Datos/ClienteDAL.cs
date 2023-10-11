using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
namespace Capa_Datos
{
    public class ClienteDAL : CadenaDAL
    {

        public List<ClienteCLS> ListarCliente()
        {
            List<ClienteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarCliente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ClienteCLS>();
                            ClienteCLS oClienteCLS;
                            int posID = drd.GetOrdinal("ID_CLIENTE");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posTelefono = drd.GetOrdinal("FONO_CLIENTE");
                            int posMail = drd.GetOrdinal("MAIL_CLIENTE");
                            int posDireccion = drd.GetOrdinal("DIRECCION_CLIENTE");
                            int posUsuario = drd.GetOrdinal("USUARIO_CLIENTE");
                            int posClave = drd.GetOrdinal("CLAVE_CLIENTE");
                            int posRut = drd.GetOrdinal("RUT_CLIENTE");
                            while (drd.Read())
                            {
                                oClienteCLS = new ClienteCLS();
                                oClienteCLS.ID_Cliente = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oClienteCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);
                                oClienteCLS.Rut_Cliente = drd.IsDBNull(posRut) ? "" :
                                  drd.GetString(posRut);
                                oClienteCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);

                                oClienteCLS.Fono_Cliente = drd.IsDBNull(posTelefono) ? 0 :
                                    drd.GetInt32(posTelefono);

                                oClienteCLS.Mail_Cliente = drd.IsDBNull(posMail) ? "" :
                                    drd.GetString(posMail);

                                oClienteCLS.Direccion_Cliente = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);

                                oClienteCLS.Clave_Cliente = drd.IsDBNull(posClave) ? "" :
                                  drd.GetString(posClave);

                                oClienteCLS.Usuario_Cliente = drd.IsDBNull(posUsuario) ? "" :
                                  drd.GetString(posUsuario);


                                lista.Add(oClienteCLS);
                            }
                        }
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;
        }

        public ClienteCLS RecuperarCliente(int id)
        {
            ClienteCLS oClienteCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarCliente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_CLIENTE");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posTelefono = drd.GetOrdinal("FONO_CLIENTE");
                            int posMail = drd.GetOrdinal("MAIL_CLIENTE");
                            int posDireccion = drd.GetOrdinal("DIRECCION_CLIENTE");
                            int posUsuario = drd.GetOrdinal("USUARIO_CLIENTE");
                            int posClave = drd.GetOrdinal("CLAVE_CLIENTE");
                            int posRut = drd.GetOrdinal("RUT_CLIENTE");
                            while (drd.Read())
                            {
                                oClienteCLS = new ClienteCLS();
                                oClienteCLS.ID_Cliente = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oClienteCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oClienteCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oClienteCLS.Rut_Cliente = drd.IsDBNull(posRut) ? "" :
                                drd.GetString(posRut);

                                oClienteCLS.Fono_Cliente = drd.IsDBNull(posTelefono) ? 0 :
                                    drd.GetInt32(posTelefono);

                                oClienteCLS.Mail_Cliente = drd.IsDBNull(posMail) ? "" :
                                    drd.GetString(posMail);

                                oClienteCLS.Direccion_Cliente = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);

                                oClienteCLS.Clave_Cliente = drd.IsDBNull(posClave) ? "" :
                                  drd.GetString(posClave);

                                oClienteCLS.Usuario_Cliente = drd.IsDBNull(posUsuario) ? "" :
                                  drd.GetString(posUsuario);

                            }
                        }
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oClienteCLS;
        }

        public List<ClienteCLS> FiltrarCliente(string rut)
        {
            List<ClienteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("FiltrarCliente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@rut", rut);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ClienteCLS>();
                            ClienteCLS oClienteCLS;
                            int posID = drd.GetOrdinal("ID_CLIENTE");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posTelefono = drd.GetOrdinal("FONO_CLIENTE");
                            int posMail = drd.GetOrdinal("MAIL_CLIENTE");
                            int posDireccion = drd.GetOrdinal("DIRECCION_CLIENTE");
                            int posUsuario = drd.GetOrdinal("USUARIO_CLIENTE");
                            int posClave = drd.GetOrdinal("CLAVE_CLIENTE");
                            int posrut = drd.GetOrdinal("RUT_CLIENTE");
                            while (drd.Read())
                            {
                                oClienteCLS = new ClienteCLS();
                                oClienteCLS.ID_Cliente = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oClienteCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oClienteCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oClienteCLS.Rut_Cliente = drd.IsDBNull(posrut) ? "" :
                                    drd.GetString(posrut);

                                oClienteCLS.Fono_Cliente = drd.IsDBNull(posTelefono) ? 0 :
                                    drd.GetInt32(posTelefono);

                                oClienteCLS.Mail_Cliente = drd.IsDBNull(posMail) ? "" :
                                    drd.GetString(posMail);

                                oClienteCLS.Direccion_Cliente = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);

                                oClienteCLS.Clave_Cliente = drd.IsDBNull(posClave) ? "" :
                                  drd.GetString(posClave);

                                oClienteCLS.Usuario_Cliente = drd.IsDBNull(posUsuario) ? "" :
                                  drd.GetString(posUsuario);


                                lista.Add(oClienteCLS);
                            }
                        }
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;
        }

        public int GuardarCliente(ClienteCLS oCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oCliente.ID_Cliente);
                        cmd.Parameters.AddWithValue("@idAutomotriz", oCliente.ID_Automotriz);
                        cmd.Parameters.AddWithValue("@RutCliente", oCliente.Rut_Cliente);
                        cmd.Parameters.AddWithValue("@NombreCliente", oCliente.Nombre_Cliente);
                        cmd.Parameters.AddWithValue("@fonoCliente", oCliente.Fono_Cliente);
                        cmd.Parameters.AddWithValue("@mailCliente", oCliente.Mail_Cliente);
                        cmd.Parameters.AddWithValue("@direccionCliente", oCliente.Direccion_Cliente);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

        public int ModificarClienteUsu(ClienteCLS oCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarClienteUsu", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oCliente.ID_ClienteU);
                        cmd.Parameters.AddWithValue("@usuario", oCliente.Usuario_Cliente);
                        cmd.Parameters.AddWithValue("@contra", oCliente.Clave_Cliente);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

        public int EliminarCliente(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

        public List<ClienteCLS> RecuperarClienteMail(string mail)
        {
            List<ClienteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ObtenerClienteMail", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@mail", mail);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ClienteCLS>();
                            ClienteCLS oClienteCLS;
                            int posID = drd.GetOrdinal("ID_CLIENTE");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posTelefono = drd.GetOrdinal("FONO_CLIENTE");
                            int posMail = drd.GetOrdinal("MAIL_CLIENTE");
                            int posDireccion = drd.GetOrdinal("DIRECCION_CLIENTE");
                            int posUsuario = drd.GetOrdinal("USUARIO_CLIENTE");
                            int posClave = drd.GetOrdinal("CLAVE_CLIENTE");
                            int posrut = drd.GetOrdinal("RUT_CLIENTE");
                            while (drd.Read())
                            {
                                oClienteCLS = new ClienteCLS();
                                oClienteCLS.ID_Cliente = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oClienteCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oClienteCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oClienteCLS.Rut_Cliente = drd.IsDBNull(posrut) ? "" :
                                    drd.GetString(posrut);

                                oClienteCLS.Fono_Cliente = drd.IsDBNull(posTelefono) ? 0 :
                                    drd.GetInt32(posTelefono);

                                oClienteCLS.Mail_Cliente = drd.IsDBNull(posMail) ? "" :
                                    drd.GetString(posMail);

                                oClienteCLS.Direccion_Cliente = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);

                                oClienteCLS.Clave_Cliente = drd.IsDBNull(posClave) ? "" :
                                  drd.GetString(posClave);

                                oClienteCLS.Usuario_Cliente = drd.IsDBNull(posUsuario) ? "" :
                                  drd.GetString(posUsuario);


                                lista.Add(oClienteCLS);
                            }
                        }
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;
        }

        public ClienteCLS login(String mail, String contra)
        {
            ClienteCLS oClienteCLS = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("IngresarWeb", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@MAIL", mail);
                        cmd.Parameters.AddWithValue("@CLAVE", contra);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_CLIENTE");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posFono = drd.GetOrdinal("FONO_CLIENTE");
                            int posMail = drd.GetOrdinal("MAIL_CLIENTE");
                            int posDireccion = drd.GetOrdinal("DIRECCION_CLIENTE");
                            int posUsuario = drd.GetOrdinal("USUARIO_CLIENTE");
                            int posClave = drd.GetOrdinal("CLAVE_CLIENTE");
                            int posRut = drd.GetOrdinal("RUT_CLIENTE");

                            oClienteCLS = new ClienteCLS();
                            while (drd.Read())
                            {
                                oClienteCLS.ID_Cliente = drd.IsDBNull(posID) ? 0 :
                                  drd.GetInt32(posID);

                                oClienteCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                   drd.GetInt32(posIDA);

                                oClienteCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);

                                oClienteCLS.Fono_Cliente = drd.IsDBNull(posFono) ? 0 :
                                 drd.GetInt32(posFono);
                                oClienteCLS.Mail_Cliente = drd.IsDBNull(posMail) ? "" :
                                  drd.GetString(posMail);

                                oClienteCLS.Direccion_Cliente = drd.IsDBNull(posDireccion) ? "" :
                                 drd.GetString(posDireccion);

                                oClienteCLS.Usuario_Cliente = drd.IsDBNull(posUsuario) ? "" :
                                  drd.GetString(posUsuario);

                                oClienteCLS.Clave_Cliente = drd.IsDBNull(posClave) ? "" :
                                 drd.GetString(posClave);

                                oClienteCLS.Rut_Cliente = drd.IsDBNull(posRut) ? "" :
                                 drd.GetString(posRut);
                            }
                        }
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oClienteCLS;
        }

        public int GuardarClienteUsuario(ClienteCLS oCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarClienteUsuario", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oCliente.ID_Cliente);
                        cmd.Parameters.AddWithValue("@idAutomotriz", oCliente.ID_Automotriz);
                        cmd.Parameters.AddWithValue("@RutCliente", oCliente.Rut_Cliente);
                        cmd.Parameters.AddWithValue("@NombreCliente", oCliente.Nombre_Cliente);
                        cmd.Parameters.AddWithValue("@fonoCliente", oCliente.Fono_Cliente);
                        cmd.Parameters.AddWithValue("@mailCliente", oCliente.Mail_Cliente);
                        cmd.Parameters.AddWithValue("@direccionCliente", oCliente.Direccion_Cliente);
                        cmd.Parameters.AddWithValue("@usuario", oCliente.Usuario_Cliente);
                        cmd.Parameters.AddWithValue("@clave", oCliente.Clave_Cliente);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

        public int RegistrarClienteUsuario(int idA,string rut,string mail,string usuario,string clave)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarClienteUsuario", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", 0);
                        cmd.Parameters.AddWithValue("@idAutomotriz", idA);
                        cmd.Parameters.AddWithValue("@RutCliente", rut);
                        cmd.Parameters.AddWithValue("@NombreCliente", "sin especificar");
                        cmd.Parameters.AddWithValue("@fonoCliente", 0);
                        cmd.Parameters.AddWithValue("@mailCliente", mail);
                        cmd.Parameters.AddWithValue("@direccionCliente", "sin especificar");
                        cmd.Parameters.AddWithValue("@usuario", usuario);
                        cmd.Parameters.AddWithValue("@clave", clave);
                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

        public int RandomPass(int id,string pass,string user)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RandomPass", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@clave", pass);
                        cmd.Parameters.AddWithValue("@user", user);

                        rpta = cmd.ExecuteNonQuery();
                        cn.Close();
                    }
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
            return rpta;
        }

    }


}
