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
    public class AveriasDAL : CadenaDAL
    {
        public List<AveriasCLS> ListarAverias()
        {
            List<AveriasCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarAverias", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<AveriasCLS>();
                            AveriasCLS oAveriasCLS;
                            int posID = drd.GetOrdinal("ID_AVERIA");
                            int posNombre = drd.GetOrdinal("NOMBRE_AVERIA");
                            while (drd.Read())
                            {
                                oAveriasCLS = new AveriasCLS();
                                oAveriasCLS.ID_Averia = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAveriasCLS.Nombre_Averia = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oAveriasCLS);
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

        public int GuardarAverias(AveriasCLS oAverias)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarAveria", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oAverias.ID_Averia);
                        cmd.Parameters.AddWithValue("@Nombre", oAverias.Nombre_Averia);
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


        public int EliminarAverias(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarAveria", cn))
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

        public AveriasCLS RecuperarMarca(int id)
        {
            AveriasCLS oAveriasCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarAveria", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_AVERIA");
                            int posNombre = drd.GetOrdinal("NOMBRE_AVERIA");
                            while (drd.Read())
                            {
                                oAveriasCLS = new AveriasCLS();
                                oAveriasCLS.ID_Averia = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAveriasCLS.Nombre_Averia = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);

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
            return oAveriasCLS;
        }


        public List<AveriasCLS> VerificarAveria(string nombreAveria)
        {
            List<AveriasCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarAveria", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreAveria", nombreAveria);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<AveriasCLS>();
                            AveriasCLS oAveriasCLS;
                            int posID = drd.GetOrdinal("ID_AVERIA");
                            int posNombre = drd.GetOrdinal("NOMBRE_AVERIA");
                            while (drd.Read())
                            {
                                oAveriasCLS = new AveriasCLS();
                                oAveriasCLS.ID_Averia = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oAveriasCLS.Nombre_Averia = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oAveriasCLS);
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
