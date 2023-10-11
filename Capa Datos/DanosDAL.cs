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
    public class DanosDAL : CadenaDAL
    {



         public List<DanosCLS> ListarDanosRecepcion(int id)
        {
            List<DanosCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarDanos", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<DanosCLS>();
                            DanosCLS oDanosCLS;
                            int posNA = drd.GetOrdinal("Nombre_Averia");
                            int posNE = drd.GetOrdinal("Especificacion");
                            int posIDA = drd.GetOrdinal("ID_Averia");
                            while (drd.Read())
                            {
                                oDanosCLS = new DanosCLS();
                                oDanosCLS.Nombre_Averia = drd.IsDBNull(posNA) ? "" :
                                    drd.GetString(posNA);
                                oDanosCLS.Especificacion = drd.IsDBNull(posNE) ? "" :
                                    drd.GetString(posNE);
                                oDanosCLS.ID_Averia = drd.IsDBNull(posIDA) ? 0 :
                                   drd.GetInt32(posIDA);
                                lista.Add(oDanosCLS);
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



        public int GuardarDanos(DanosCLS oDanos)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarDanos", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", oDanos.ID_Recepcion);
                        cmd.Parameters.AddWithValue("@idA", oDanos.ID_Averia);

                        if(oDanos.Especificacion== null)
                        {
                            cmd.Parameters.AddWithValue("@Especificacion", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@Especificacion", oDanos.Especificacion);
                        }

                        
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

        public int ModificarDanos(DanosCLS oDanos)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ModificarDanos", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", oDanos.ID_Recepcion);
                        cmd.Parameters.AddWithValue("@idA", oDanos.ID_Averia);

                        if (oDanos.Especificacion == null)
                        {
                            cmd.Parameters.AddWithValue("@Especificacion", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@Especificacion", oDanos.Especificacion);
                        }


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
        public int EliminarDanos(int idR,int idA)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarDanos", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", idR);
                        cmd.Parameters.AddWithValue("@idA", idA);
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


        public DanosCLS RecuperarDanos(int idR,int idA)
        {
            DanosCLS oDanosCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarDanos", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", idR);
                        cmd.Parameters.AddWithValue("@idA", idA);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_Averia");
                            int posEsp = drd.GetOrdinal("Especificacion");
                            while (drd.Read())
                            {
                                oDanosCLS = new DanosCLS();
                                oDanosCLS.ID_Averia = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oDanosCLS.Especificacion = drd.IsDBNull(posEsp) ? "" :
                                    drd.GetString(posEsp);

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
            return oDanosCLS;
        }



    }
}
