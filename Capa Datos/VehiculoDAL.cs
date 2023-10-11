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
    public class VehiculoDAL : CadenaDAL
    {

        public List<VehiculoCLS> listarVehiculoPorCliente(int idCliente)
        {
            List<VehiculoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarVehiculoPorCliente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idCliente", idCliente);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<VehiculoCLS>();
                            VehiculoCLS oVehiculoCLS;
                            int posID = drd.GetOrdinal("ID_VEHICULO");
                            int posIDC = drd.GetOrdinal("ID_CLIENTE");
                            int posIDM = drd.GetOrdinal("ID_MODELO");
                            int posIDE = drd.GetOrdinal("ID_ESTADO");
                            int posIDT = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posPATENTE = drd.GetOrdinal("PATENTE");
                            int posNOMBREC = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posNOMBREM = drd.GetOrdinal("NOMBRE_MODELO");
                            int posNOMBREE = drd.GetOrdinal("NOMBRE_ESTADO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            int posANO = drd.GetOrdinal("ANO_VEHICULO");
                            int posCOLOR = drd.GetOrdinal("COLOR");
                            int posMarca = drd.GetOrdinal("ID_Marca");

                            while (drd.Read())
                            {
                                oVehiculoCLS = new VehiculoCLS();
                                oVehiculoCLS.ID_Vehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);

                                oVehiculoCLS.ID_Cliente = drd.IsDBNull(posIDC) ? 0 :
                                    drd.GetInt32(posIDC);

                                oVehiculoCLS.ID_Modelo = drd.IsDBNull(posIDM) ? 0 :
                                    drd.GetInt32(posIDM);

                                oVehiculoCLS.ID_Marca = drd.IsDBNull(posMarca) ? 0 :
                                    drd.GetInt32(posMarca);

                                oVehiculoCLS.ID_Estado = drd.IsDBNull(posIDE) ? 0 :
                                    drd.GetInt32(posIDE);

                                oVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posIDT) ? 0 :
                                    drd.GetInt32(posIDT);

                                oVehiculoCLS.Patente= drd.IsDBNull(posPATENTE) ? "" :
                                    drd.GetString(posPATENTE);

                                oVehiculoCLS.Nombre_Cliente = drd.IsDBNull(posNOMBREC) ? "" :
                                        drd.GetString(posNOMBREC);
                                oVehiculoCLS.Nombre_Modelo = drd.IsDBNull(posNOMBREM) ? "" :
                                        drd.GetString(posNOMBREM);
                                oVehiculoCLS.Nombre_Estado = drd.IsDBNull(posNOMBREE) ? "" :
                                       drd.GetString(posNOMBREE);
                                oVehiculoCLS.Producto = drd.IsDBNull(posProducto) ? "" :
                                       drd.GetString(posProducto);
                                oVehiculoCLS.Ano_Vehiculo = drd.IsDBNull(posANO) ? 0 :
                                    drd.GetInt32(posANO);
                                oVehiculoCLS.Color = drd.IsDBNull(posCOLOR) ? "" :
                                       drd.GetString(posCOLOR);


                                lista.Add(oVehiculoCLS);
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


         public VehiculoCLS RecuperarVehiculo(int id)
    {
        VehiculoCLS oVehiculoCLS = null;
        //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
        using (SqlConnection cn = new SqlConnection(cadena))
        {
            try
            {
                cn.Open();
                using (SqlCommand cmd = new SqlCommand("RecuperarVehiculo", cn))
                {
                    //Indicar que es un procedure
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", id);
                    SqlDataReader drd = cmd.ExecuteReader();
                    if (drd != null)
                    {
                            int posID = drd.GetOrdinal("ID_VEHICULO");

                            int posIDC = drd.GetOrdinal("ID_Cliente");
                            int posIDM = drd.GetOrdinal("ID_MODELO");
                            int posIDE = drd.GetOrdinal("ID_ESTADO");
                            int posIDT = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posPATENTE = drd.GetOrdinal("PATENTE");
              
                            int posNOMBREM = drd.GetOrdinal("NOMBRE_MODELO");
                            int posNOMBREE = drd.GetOrdinal("NOMBRE_ESTADO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            int posANO = drd.GetOrdinal("ANO_VEHICULO");
                            int posCOLOR = drd.GetOrdinal("COLOR");
                            int posMarca = drd.GetOrdinal("ID_Marca");
                            while (drd.Read())
                        {
                                oVehiculoCLS = new VehiculoCLS();
                                oVehiculoCLS = new VehiculoCLS();
                                oVehiculoCLS.ID_Vehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oVehiculoCLS.ID_Cliente = drd.IsDBNull(posIDC) ? 0 :
                                    drd.GetInt32(posIDC);


                                oVehiculoCLS.ID_Modelo = drd.IsDBNull(posIDM) ? 0 :
                                    drd.GetInt32(posIDM);

                                oVehiculoCLS.ID_Marca = drd.IsDBNull(posMarca) ? 0 :
                                    drd.GetInt32(posMarca);

                                oVehiculoCLS.ID_Estado = drd.IsDBNull(posIDE) ? 0 :
                                    drd.GetInt32(posIDE);

                                oVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posIDT) ? 0 :
                                    drd.GetInt32(posIDT);

                                oVehiculoCLS.Patente = drd.IsDBNull(posPATENTE) ? "" :
                                    drd.GetString(posPATENTE);

                                oVehiculoCLS.Nombre_Modelo = drd.IsDBNull(posNOMBREM) ? "" :
                                        drd.GetString(posNOMBREM);
                                oVehiculoCLS.Nombre_Estado = drd.IsDBNull(posNOMBREE) ? "" :
                                       drd.GetString(posNOMBREE);
                                oVehiculoCLS.Producto = drd.IsDBNull(posProducto) ? "" :
                                       drd.GetString(posProducto);
                                oVehiculoCLS.Ano_Vehiculo = drd.IsDBNull(posANO) ? 0 :
                                    drd.GetInt32(posANO);
                                oVehiculoCLS.Color = drd.IsDBNull(posCOLOR) ? "" :
                                       drd.GetString(posCOLOR);

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
        return oVehiculoCLS;
    }


        public int GuardarVehiculo(VehiculoCLS oVehiculo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oVehiculo.ID_Vehiculo);
                        cmd.Parameters.AddWithValue("@Patente", oVehiculo.Patente);
                        cmd.Parameters.AddWithValue("@idModelo", oVehiculo.ID_Modelo);
                        cmd.Parameters.AddWithValue("@idCliente", oVehiculo.ID_Cliente);
                        cmd.Parameters.AddWithValue("@idEstado", oVehiculo.ID_Estado);
                        cmd.Parameters.AddWithValue("@idTipo", oVehiculo.ID_TipoVehiculo);
                        if(oVehiculo.Ano_Vehiculo != 0)
                        {
                            cmd.Parameters.AddWithValue("@Ano", oVehiculo.Ano_Vehiculo);
                        }
                       
                       
                        cmd.Parameters.AddWithValue("@Color", oVehiculo.Color);
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

        public int EliminarVehiculo(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarVehiculo", cn))
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

        public List<VehiculoCLS> verificarPatente(string patente)
        {
            List<VehiculoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarPatente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@patente", patente);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<VehiculoCLS>();
                            VehiculoCLS oVehiculoCLS;
                            int posID = drd.GetOrdinal("ID_VEHICULO");
                            int posIDC = drd.GetOrdinal("ID_CLIENTE");
                            int posIDM = drd.GetOrdinal("ID_MODELO");
                            int posIDE = drd.GetOrdinal("ID_ESTADO");
                            int posIDT = drd.GetOrdinal("ID_TIPOVEHICULO");
                            int posPATENTE = drd.GetOrdinal("PATENTE");
                            int posNOMBREC = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posNOMBREM = drd.GetOrdinal("NOMBRE_MODELO");
                            int posNOMBREE = drd.GetOrdinal("NOMBRE_ESTADO");
                            int posProducto = drd.GetOrdinal("PRODUCTO");
                            int posANO = drd.GetOrdinal("ANO_VEHICULO");
                            int posCOLOR = drd.GetOrdinal("COLOR");
                            int posMarca = drd.GetOrdinal("ID_Marca");

                            while (drd.Read())
                            {
                                oVehiculoCLS = new VehiculoCLS();
                                oVehiculoCLS.ID_Vehiculo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);

                                oVehiculoCLS.ID_Cliente = drd.IsDBNull(posIDC) ? 0 :
                                    drd.GetInt32(posIDC);

                                oVehiculoCLS.ID_Modelo = drd.IsDBNull(posIDM) ? 0 :
                                    drd.GetInt32(posIDM);

                                oVehiculoCLS.ID_Marca = drd.IsDBNull(posMarca) ? 0 :
                                    drd.GetInt32(posMarca);

                                oVehiculoCLS.ID_Estado = drd.IsDBNull(posIDE) ? 0 :
                                    drd.GetInt32(posIDE);

                                oVehiculoCLS.ID_TipoVehiculo = drd.IsDBNull(posIDT) ? 0 :
                                    drd.GetInt32(posIDT);

                                oVehiculoCLS.Patente = drd.IsDBNull(posPATENTE) ? "" :
                                    drd.GetString(posPATENTE);

                                oVehiculoCLS.Nombre_Cliente = drd.IsDBNull(posNOMBREC) ? "" :
                                        drd.GetString(posNOMBREC);
                                oVehiculoCLS.Nombre_Modelo = drd.IsDBNull(posNOMBREM) ? "" :
                                        drd.GetString(posNOMBREM);
                                oVehiculoCLS.Nombre_Estado = drd.IsDBNull(posNOMBREE) ? "" :
                                       drd.GetString(posNOMBREE);
                                oVehiculoCLS.Producto = drd.IsDBNull(posProducto) ? "" :
                                       drd.GetString(posProducto);
                                oVehiculoCLS.Ano_Vehiculo = drd.IsDBNull(posANO) ? 0 :
                                    drd.GetInt32(posANO);
                                oVehiculoCLS.Color = drd.IsDBNull(posCOLOR) ? "" :
                                       drd.GetString(posCOLOR);


                                lista.Add(oVehiculoCLS);
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
