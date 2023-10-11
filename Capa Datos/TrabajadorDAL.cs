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
    public class TrabajadorDAL : CadenaDAL
    {

        public List<TrabajadorCLS> ListarTrabajador()
        {
            List<TrabajadorCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarTrabajador", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TrabajadorCLS>();
                            TrabajadorCLS oTrabajadorCLS;
                            int posID = drd.GetOrdinal("ID_TRABAJADOR");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_TRABAJADOR");
                            int posDireccion = drd.GetOrdinal("DIRECCION_TRABAJADOR");
                            int posTelefono = drd.GetOrdinal("TELEFONO_TRABAJADOR");
                            int posMail = drd.GetOrdinal("MAIL_TRABAJADOR");
                            int posRut = drd.GetOrdinal("RUT_TRABAJADOR");
                            while (drd.Read())
                            {

                                oTrabajadorCLS = new TrabajadorCLS();
                                oTrabajadorCLS.ID_Trabajador = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTrabajadorCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oTrabajadorCLS.Nombre_Trabajador = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oTrabajadorCLS.Direccion_Trabajador = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oTrabajadorCLS.Telefono_Trabajador = drd.IsDBNull(posTelefono) ? 0 :
                                  drd.GetInt32(posTelefono);
                                oTrabajadorCLS.Mail_Trabajador = drd.IsDBNull(posMail) ? "" :
                                   drd.GetString(posMail);
                                oTrabajadorCLS.Rut_Trabajador = drd.IsDBNull(posRut) ? "" :
                                   drd.GetString(posRut);


                                lista.Add(oTrabajadorCLS);
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



        public int GuardarTrabajador(TrabajadorCLS oTrabajador)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarTrabajador", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oTrabajador.ID_Trabajador);
                        cmd.Parameters.AddWithValue("@idA", oTrabajador.ID_Automotriz);
                        cmd.Parameters.AddWithValue("@Nombre", oTrabajador.Nombre_Trabajador);
                        cmd.Parameters.AddWithValue("@Direccion", oTrabajador.Direccion_Trabajador);
                        cmd.Parameters.AddWithValue("@Telefono", oTrabajador.Telefono_Trabajador);
                        cmd.Parameters.AddWithValue("@Mail", oTrabajador.Mail_Trabajador);
                        cmd.Parameters.AddWithValue("@Rut", oTrabajador.Rut_Trabajador);
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

        public int EliminarTrabajador(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarTrabajador", cn))
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


        public TrabajadorCLS RecuperarTrabajador(int id)
        {
            TrabajadorCLS oTrabajadorCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarTrabajador", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_TRABAJADOR");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_TRABAJADOR");
                            int posDireccion = drd.GetOrdinal("DIRECCION_TRABAJADOR");
                            int posTelefono = drd.GetOrdinal("TELEFONO_TRABAJADOR");
                            int posMail = drd.GetOrdinal("MAIL_TRABAJADOR");
                            int posRut = drd.GetOrdinal("RUT_TRABAJADOR");

                            while (drd.Read())
                            {
                                oTrabajadorCLS = new TrabajadorCLS();
                                oTrabajadorCLS.ID_Trabajador = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTrabajadorCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oTrabajadorCLS.Nombre_Trabajador = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oTrabajadorCLS.Direccion_Trabajador = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oTrabajadorCLS.Telefono_Trabajador = drd.IsDBNull(posTelefono) ? 0 :
                                  drd.GetInt32(posTelefono);
                                oTrabajadorCLS.Mail_Trabajador = drd.IsDBNull(posMail) ? "" :
                                   drd.GetString(posMail);
                                oTrabajadorCLS.Rut_Trabajador = drd.IsDBNull(posRut) ? "" :
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
            return oTrabajadorCLS;
        }

        public List<TrabajadorCLS> VerificarTrabajadorRut(string rut)
        {
            List<TrabajadorCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarTrabajadorRut", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@rut", rut);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TrabajadorCLS>();
                            TrabajadorCLS oTrabajadorCLS;
                            int posID = drd.GetOrdinal("ID_TRABAJADOR");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_TRABAJADOR");
                            int posDireccion = drd.GetOrdinal("DIRECCION_TRABAJADOR");
                            int posTelefono = drd.GetOrdinal("TELEFONO_TRABAJADOR");
                            int posMail = drd.GetOrdinal("MAIL_TRABAJADOR");
                            int posRut = drd.GetOrdinal("RUT_TRABAJADOR");
                            while (drd.Read())
                            {

                                oTrabajadorCLS = new TrabajadorCLS();
                                oTrabajadorCLS.ID_Trabajador = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTrabajadorCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oTrabajadorCLS.Nombre_Trabajador = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oTrabajadorCLS.Direccion_Trabajador = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oTrabajadorCLS.Telefono_Trabajador = drd.IsDBNull(posTelefono) ? 0 :
                                  drd.GetInt32(posTelefono);
                                oTrabajadorCLS.Mail_Trabajador = drd.IsDBNull(posMail) ? "" :
                                   drd.GetString(posMail);
                                oTrabajadorCLS.Rut_Trabajador = drd.IsDBNull(posRut) ? "" :
                                   drd.GetString(posRut);


                                lista.Add(oTrabajadorCLS);
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

        public List<TrabajadorCLS> VerificarTrabajadorMail(string mail)
        {
            List<TrabajadorCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarTrabajadorMail", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@mail", mail);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TrabajadorCLS>();
                            TrabajadorCLS oTrabajadorCLS;
                            int posID = drd.GetOrdinal("ID_TRABAJADOR");
                            int posIDA = drd.GetOrdinal("ID_AUTOMOTRIZ");
                            int posNombre = drd.GetOrdinal("NOMBRE_TRABAJADOR");
                            int posDireccion = drd.GetOrdinal("DIRECCION_TRABAJADOR");
                            int posTelefono = drd.GetOrdinal("TELEFONO_TRABAJADOR");
                            int posMail = drd.GetOrdinal("MAIL_TRABAJADOR");
                            int posRut = drd.GetOrdinal("RUT_TRABAJADOR");
                            while (drd.Read())
                            {

                                oTrabajadorCLS = new TrabajadorCLS();
                                oTrabajadorCLS.ID_Trabajador = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTrabajadorCLS.ID_Automotriz = drd.IsDBNull(posIDA) ? 0 :
                                    drd.GetInt32(posIDA);

                                oTrabajadorCLS.Nombre_Trabajador = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                oTrabajadorCLS.Direccion_Trabajador = drd.IsDBNull(posDireccion) ? "" :
                                    drd.GetString(posDireccion);
                                oTrabajadorCLS.Telefono_Trabajador = drd.IsDBNull(posTelefono) ? 0 :
                                  drd.GetInt32(posTelefono);
                                oTrabajadorCLS.Mail_Trabajador = drd.IsDBNull(posMail) ? "" :
                                   drd.GetString(posMail);
                                oTrabajadorCLS.Rut_Trabajador = drd.IsDBNull(posRut) ? "" :
                                   drd.GetString(posRut);


                                lista.Add(oTrabajadorCLS);
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

    }
}
