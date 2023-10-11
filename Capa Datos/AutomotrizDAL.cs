using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
using System.Data.SqlClient;
using System.Data;

namespace Capa_Datos
{
    public class AutomotrizDAL : CadenaDAL
    {

        public AutomotrizCLS login(String mail,String contra)
        {
            AutomotrizCLS oAutomotrizCLS = null;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using(SqlCommand cmd = new SqlCommand("IngresarAutomotriz", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@MAIL", mail);
                        cmd.Parameters.AddWithValue("@CLAVE", contra);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_AUTOMOTRIZ");
                            int posCiudad = drd.GetOrdinal("CIUDAD_AUTOMOTRIZ");
                            int posFono = drd.GetOrdinal("FONO_AUTOMOTRIZ");
                            int posDireccion = drd.GetOrdinal("DIRECCION_AUTOMOTRIZ");
                            int posMail = drd.GetOrdinal("MAIL_AUTOMOTRIZ");
                            int posUsuario = drd.GetOrdinal("USUARIO_WEB");
                            int posClave = drd.GetOrdinal("CLAVE_WEB");
                            oAutomotrizCLS = new AutomotrizCLS();
                            while (drd.Read())
                            {
                                 oAutomotrizCLS.ID_Automotriz = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAutomotrizCLS.Nombre_Automotriz = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oAutomotrizCLS.Ciudad_Automotriz = drd.IsDBNull(posCiudad) ? "" :
                                   drd.GetString(posCiudad);
                                oAutomotrizCLS.Fono_Automotriz = drd.IsDBNull(posFono) ? 0 :
                                    drd.GetInt32(posFono);
                                oAutomotrizCLS.Direccion_Automotriz = drd.IsDBNull(posDireccion) ? "" :
                                  drd.GetString(posDireccion);
                                oAutomotrizCLS.Usuario_Web = drd.IsDBNull(posUsuario) ? "" :
                                 drd.GetString(posUsuario);
                                oAutomotrizCLS.Clave_Web = drd.IsDBNull(posClave) ? "" :
                              drd.GetString(posClave);
                                oAutomotrizCLS.Mail_Automotriz = drd.IsDBNull(posMail) ? "" :
                            drd.GetString(posMail);
                            }
                        }
                    }
                    cn.Close();
                }
                catch(Exception ex)
                {
                    cn.Close();
                }
                
            }
            return oAutomotrizCLS;
        }

        public int ModificarAutomotriz(AutomotrizCLS oAutomotriz)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ModificarAutomotriz", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oAutomotriz.ID_Automotriz);
                        cmd.Parameters.AddWithValue("@nombre", oAutomotriz.Nombre_Automotriz);
                        cmd.Parameters.AddWithValue("@ciudad", oAutomotriz.Ciudad_Automotriz);
                        cmd.Parameters.AddWithValue("@fono", oAutomotriz.Fono_Automotriz);
                        cmd.Parameters.AddWithValue("@direccion", oAutomotriz.Direccion_Automotriz);
                        cmd.Parameters.AddWithValue("@usuario", oAutomotriz.Usuario_Web);
                        cmd.Parameters.AddWithValue("@clave", oAutomotriz.Clave_Web);
                        cmd.Parameters.AddWithValue("@mail", oAutomotriz.Mail_Automotriz);
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


        public AutomotrizCLS RecuperarAutomotriz(int id)
        {
            AutomotrizCLS oAutomotrizCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarAutomotriz", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_AUTOMOTRIZ");
                            int posCiudad = drd.GetOrdinal("CIUDAD_AUTOMOTRIZ");
                            int posFono = drd.GetOrdinal("FONO_AUTOMOTRIZ");
                            int posDireccion = drd.GetOrdinal("DIRECCION_AUTOMOTRIZ");
                            int posClave = drd.GetOrdinal("CLAVE_WEB");
                            int posUsu = drd.GetOrdinal("USUARIO_WEB");
                            int posMail = drd.GetOrdinal("MAIL_AUTOMOTRIZ");
                            while (drd.Read())
                            {
                                oAutomotrizCLS = new AutomotrizCLS();
                                oAutomotrizCLS.ID_Automotriz = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAutomotrizCLS.Nombre_Automotriz = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oAutomotrizCLS.Ciudad_Automotriz = drd.IsDBNull(posCiudad) ? "" :
                                    drd.GetString(posCiudad);
                                oAutomotrizCLS.Fono_Automotriz = drd.IsDBNull(posFono) ? 0 :
                                   drd.GetInt32(posFono);
                                oAutomotrizCLS.Direccion_Automotriz = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oAutomotrizCLS.Usuario_Web = drd.IsDBNull(posUsu) ? "" :
                                   drd.GetString(posUsu);
                                oAutomotrizCLS.Clave_Web = drd.IsDBNull(posClave) ? "" :
                                    drd.GetString(posClave);

                                oAutomotrizCLS.Mail_Automotriz = drd.IsDBNull(posMail) ? "" :
                                 drd.GetString(posMail);



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
            return oAutomotrizCLS;
        }


        public AutomotrizCLS RecuperarAutomotrizRegisterClient()
        {
            AutomotrizCLS oAutomotrizCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarAutomotrizRegisterClient", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_AUTOMOTRIZ");
                            int posCiudad = drd.GetOrdinal("CIUDAD_AUTOMOTRIZ");
                            int posFono = drd.GetOrdinal("FONO_AUTOMOTRIZ");
                            int posDireccion = drd.GetOrdinal("DIRECCION_AUTOMOTRIZ");

                            int posMail = drd.GetOrdinal("MAIL_AUTOMOTRIZ");
                            while (drd.Read())
                            {
                                oAutomotrizCLS = new AutomotrizCLS();
                                oAutomotrizCLS.ID_Automotriz = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAutomotrizCLS.Nombre_Automotriz = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oAutomotrizCLS.Ciudad_Automotriz = drd.IsDBNull(posCiudad) ? "" :
                                    drd.GetString(posCiudad);
                                oAutomotrizCLS.Fono_Automotriz = drd.IsDBNull(posFono) ? 0 :
                                   drd.GetInt32(posFono);
                                oAutomotrizCLS.Direccion_Automotriz = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oAutomotrizCLS.Mail_Automotriz = drd.IsDBNull(posMail) ? "" :
                                 drd.GetString(posMail);



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
            return oAutomotrizCLS;
        }
    }
}
