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
    public class EstadoDAL : CadenaDAL
    {
        public List<EstadoCLS> ListarEstado()
        {
            List<EstadoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarEstado", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<EstadoCLS>();
                            EstadoCLS oEstadoCLS;
                            int posID = drd.GetOrdinal("ID_ESTADO");
                            int posNombre = drd.GetOrdinal("NOMBRE_ESTADO");
                            while (drd.Read())
                            {
                                oEstadoCLS = new EstadoCLS();
                                oEstadoCLS.ID_Estado = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oEstadoCLS.Nombre_Estado = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oEstadoCLS);
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
       

        public List<EstadoCLS> VerificarEstado(string nombreEstado)
        {
            List<EstadoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarEstado", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreEstado", nombreEstado);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<EstadoCLS>();
                            EstadoCLS oEstadoCLS;
                            int posID = drd.GetOrdinal("ID_ESTADO");
                            int posNombre = drd.GetOrdinal("NOMBRE_ESTADO");
                            while (drd.Read())
                            {
                                oEstadoCLS = new EstadoCLS();
                                oEstadoCLS.ID_Estado = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oEstadoCLS.Nombre_Estado = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oEstadoCLS);
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

        public EstadoCLS RecuperarEstado(int id)
        {
            EstadoCLS oEstadoCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarEstado", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_ESTADO");
                            int posNombre = drd.GetOrdinal("NOMBRE_ESTADO");
                            while (drd.Read())
                            {
                                oEstadoCLS = new EstadoCLS();
                                oEstadoCLS.ID_Estado = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oEstadoCLS.Nombre_Estado = drd.IsDBNull(posNombre) ? "" :
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
            return oEstadoCLS;
        }

        public int GuardarEstado(EstadoCLS oEstado)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarEstado", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oEstado.ID_Estado);
                        cmd.Parameters.AddWithValue("@Nombre", oEstado.Nombre_Estado);
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

        public int EliminarEstado(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarEstado", cn))
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

    }
}
