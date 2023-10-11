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
    
    public class ReparacionesDAL : CadenaDAL
    {
        public List<ReparacionesCLS> ListarReparaciones()
        {
            List<ReparacionesCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarReparaciones", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ReparacionesCLS>();
                            ReparacionesCLS oReparacionesCLS;
                            int posID = drd.GetOrdinal("ID_REPARACION");
                            int posDetalle = drd.GetOrdinal("DETALLE");
                            int posValor = drd.GetOrdinal("VALOR");
                            while (drd.Read())
                            {
                                oReparacionesCLS = new ReparacionesCLS();
                                oReparacionesCLS.ID_Reparacion = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oReparacionesCLS.Detalle = drd.IsDBNull(posDetalle) ? "" :
                                    drd.GetString(posDetalle);
                                oReparacionesCLS.Valor = drd.IsDBNull(posValor) ? 0 :
                                   drd.GetInt32(posValor);
                                lista.Add(oReparacionesCLS);
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


        public ReparacionesCLS RecuperarReparacion(int id)
        {
            ReparacionesCLS oReparacionesCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarReparacion", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_REPARACION");
                            int posDetalle = drd.GetOrdinal("DETALLE");
                            int posValor = drd.GetOrdinal("VALOR");
                            while (drd.Read())
                            {
                                oReparacionesCLS = new ReparacionesCLS();
                                oReparacionesCLS.ID_Reparacion = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oReparacionesCLS.Detalle = drd.IsDBNull(posDetalle) ? "" :
                                    drd.GetString(posDetalle);
                                oReparacionesCLS.Valor = drd.IsDBNull(posValor) ? 0 :
                                   drd.GetInt32(posValor);
                               

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
            return oReparacionesCLS;
        }
        public int EliminarReparacion(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarReparacion", cn))
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

        public int GuardarReaparacion(ReparacionesCLS oReparacion)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarReparacion", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oReparacion.ID_Reparacion);
                        cmd.Parameters.AddWithValue("@Detalle", oReparacion.Detalle);
                        cmd.Parameters.AddWithValue("@valor", oReparacion.Valor);
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

        public List<ReparacionesCLS> VerificarReparacion(string nombreReparacion)
        {
            List<ReparacionesCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarReparacion", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreReparacion", nombreReparacion);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ReparacionesCLS>();
                            ReparacionesCLS oReparacionesCLS;
                            int posID = drd.GetOrdinal("ID_REPARACION");
                            int posDetalle = drd.GetOrdinal("DETALLE");
                            int posValor = drd.GetOrdinal("VALOR");
                            while (drd.Read())
                            {
                                oReparacionesCLS = new ReparacionesCLS();
                                oReparacionesCLS.ID_Reparacion = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oReparacionesCLS.Detalle = drd.IsDBNull(posDetalle) ? "" :
                                    drd.GetString(posDetalle);
                                oReparacionesCLS.Valor = drd.IsDBNull(posValor) ? 0 :
                                   drd.GetInt32(posValor);
                                lista.Add(oReparacionesCLS);
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
