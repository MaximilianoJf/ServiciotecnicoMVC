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
    public class TipoVehiculoDAL : CadenaDAL
    {
        public List<TipoVehiculoCLS> ListarTipoVehiculo()
        {
            List<TipoVehiculoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarTipoV", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoVehiculoCLS>();
                            TipoVehiculoCLS oTipoVehiculoCLS;
                            int posID = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            while (drd.Read())
                            {
                                oTipoVehiculoCLS = new TipoVehiculoCLS();
                                oTipoVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTipoVehiculoCLS.Producto= drd.IsDBNull(posProducto) ? "" :
                                    drd.GetString(posProducto);
                                lista.Add(oTipoVehiculoCLS);
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

        public TipoVehiculoCLS RecuperarTipoVehiculo(int id)
        {
            TipoVehiculoCLS oTipoVehiculoCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarTipoVehiculo", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            while (drd.Read())
                            {
                                oTipoVehiculoCLS = new TipoVehiculoCLS();
                                oTipoVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTipoVehiculoCLS.Producto = drd.IsDBNull(posProducto) ? "" :
                                    drd.GetString(posProducto);

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
            return oTipoVehiculoCLS;
        }

        public int GuardarTipoVehiculo(TipoVehiculoCLS oTipoVehiculo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarTipoVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oTipoVehiculo.ID_TipoVehiculo);
                        cmd.Parameters.AddWithValue("@Producto", oTipoVehiculo.Producto);
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

        public int EliminarTipoVehiculo(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarTipoVehiculo", cn))
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

        public List<TipoVehiculoCLS> VerificarTipo(string nombreTipo)
        {
            List<TipoVehiculoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarTipo", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@producto", nombreTipo);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoVehiculoCLS>();
                            TipoVehiculoCLS oTipoVehiculoCLS;
                            int posID = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            while (drd.Read())
                            {
                                oTipoVehiculoCLS = new TipoVehiculoCLS();
                                oTipoVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oTipoVehiculoCLS.Producto = drd.IsDBNull(posProducto) ? "" :
                                    drd.GetString(posProducto);
                                lista.Add(oTipoVehiculoCLS);
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
