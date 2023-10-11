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
    public class RecepcionVehiculoDAL : CadenaDAL
    {

       

        public List<MostrarRecepcionCLS> ListarRecepcion()
        {
            List<MostrarRecepcionCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarRecepcion", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarRecepcionCLS>();
                            MostrarRecepcionCLS oRecepcionVehiculoCLS;
                        
                            int posFechaR = drd.GetOrdinal("FECHA_RECEPCION");
                            int posFinS = drd.GetOrdinal("FIN_SERVICIO");
                            int posCustodia = drd.GetOrdinal("CUSTODIA");
                            int posInicioS = drd.GetOrdinal("INICIO_SERVICIO");

                            while (drd.Read())
                            {
                                oRecepcionVehiculoCLS = new MostrarRecepcionCLS();
                               
                                oRecepcionVehiculoCLS.Fecha_Recepcion = drd.IsDBNull(posFechaR) ? "" :
                                 drd.GetString(posFechaR);

                                oRecepcionVehiculoCLS.Fin_Servicio = drd.IsDBNull(posFinS) ? "" :
                                drd.GetString(posFinS);
                                oRecepcionVehiculoCLS.Custodia = drd.IsDBNull(posCustodia) ? "" :
                               drd.GetString(posCustodia);
                                oRecepcionVehiculoCLS.Inicio_Servicio = drd.IsDBNull(posInicioS) ? "" :
                               drd.GetString(posInicioS);




                                lista.Add(oRecepcionVehiculoCLS);
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


        public List<MostrarRecepcionCLS> ListarRecepcionVehiculo(int id)
        {
            List<MostrarRecepcionCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ListarRecepcionVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarRecepcionCLS>();
                            MostrarRecepcionCLS oRecepcionVehiculoCLS;

                            int posID = drd.GetOrdinal("ID_RECEPCION");
                            int posModelo = drd.GetOrdinal("MARCA_MODELO");
                            int posEstado = drd.GetOrdinal("ESTADO_PAGO");
                            int posFecha = drd.GetOrdinal("FECHA_RECEPCION");

                            while (drd.Read())
                            {
                                oRecepcionVehiculoCLS = new MostrarRecepcionCLS();

                                oRecepcionVehiculoCLS.ID_Recepcion = drd.IsDBNull(posID) ? 0 :
                                 drd.GetInt32(posID);

                                oRecepcionVehiculoCLS.Modelo_Marca= drd.IsDBNull(posModelo) ? "" :
                                drd.GetString(posModelo);
                                oRecepcionVehiculoCLS.Estado_Pago = drd.IsDBNull(posEstado) ? "" :
                               drd.GetString(posEstado);
                                oRecepcionVehiculoCLS.Fecha_Recepcion = drd.IsDBNull(posFecha) ? "" :
                               drd.GetString(posFecha);

                                lista.Add(oRecepcionVehiculoCLS);
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
        
        public List<MostrarRecepcionCLS> ListarRecepcionVehiculoFecha(int id, string Fecha)
        {
            List<MostrarRecepcionCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("FiltrarRecepcion", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@fecha", Fecha);
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarRecepcionCLS>();
                            MostrarRecepcionCLS oRecepcionVehiculoCLS;

                            int posID = drd.GetOrdinal("ID_RECEPCION");
                            int posModelo = drd.GetOrdinal("MARCA_MODELO");
                            int posEstado = drd.GetOrdinal("ESTADO_PAGO");
                            int posFecha = drd.GetOrdinal("FECHAR");

                            while (drd.Read())
                            {
                                oRecepcionVehiculoCLS = new MostrarRecepcionCLS();

                                oRecepcionVehiculoCLS.ID_Recepcion = drd.IsDBNull(posID) ? 0 :
                                 drd.GetInt32(posID);
                                oRecepcionVehiculoCLS.Modelo_Marca = drd.IsDBNull(posModelo) ? "" :
                                drd.GetString(posModelo);
                                oRecepcionVehiculoCLS.Estado_Pago = drd.IsDBNull(posEstado) ? "" :
                               drd.GetString(posEstado);
                                oRecepcionVehiculoCLS.Fecha_Recepcion = drd.IsDBNull(posFecha) ? "" :
                               drd.GetString(posFecha);

                               lista.Add(oRecepcionVehiculoCLS);
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


        public int GuardarRecepcion(RecepcionVehiculoCLS oRecepcionVehiculo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlTransaction transaccion = cn.BeginTransaction())
                    {


                        using (SqlCommand cmd = new SqlCommand("GuardarRecepción", cn, transaccion))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@id", oRecepcionVehiculo.ID_Recepcion);
                            cmd.Parameters.AddWithValue("@idV", oRecepcionVehiculo.ID_Vehiculo);
                            cmd.Parameters.AddWithValue("@idT", oRecepcionVehiculo.ID_Trabajador);
                            cmd.Parameters.AddWithValue("@idP", oRecepcionVehiculo.ID_Pago);
                            //System.Diagnostics.Debug.WriteLine(oRecepcionVehiculo.Inicio_Servicio.Year);


                            //cmd.Parameters.AddWithValue("@FechaR", oRecepcionVehiculo.Fecha_Recepcion);

                            cmd.Parameters.AddWithValue("@Bencina", oRecepcionVehiculo.Bencina);
                            cmd.Parameters.AddWithValue("@Llave", oRecepcionVehiculo.llave);
                            cmd.Parameters.AddWithValue("@Documentos", oRecepcionVehiculo.Documentos);
                            cmd.Parameters.AddWithValue("@kilomentraje", oRecepcionVehiculo.Kilometraje);

                         
                            if (oRecepcionVehiculo.Ubicacion == null)
                            {
                                cmd.Parameters.AddWithValue("@Ubicacion", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@Ubicacion", oRecepcionVehiculo.Ubicacion);
                            }

                            if (oRecepcionVehiculo.Custodia.Hour == 0)
                            {
                                cmd.Parameters.AddWithValue("@Custodia", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@Custodia", oRecepcionVehiculo.Custodia);
                            }

                            if (oRecepcionVehiculo.Fecha_Recepcion.Year == 1)
                            {
                                cmd.Parameters.AddWithValue("@FechaR", DateTime.Now);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@FechaR", oRecepcionVehiculo.Fecha_Recepcion);
                            }


                            if (oRecepcionVehiculo.Fin_Servicio.Year == 1)
                            {
                                cmd.Parameters.AddWithValue("@FinS", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@FinS", oRecepcionVehiculo.Fin_Servicio);
                            }


                            if (oRecepcionVehiculo.Inicio_Servicio.Year == 1)
                            {
                                cmd.Parameters.AddWithValue("@InicioS", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@InicioS", oRecepcionVehiculo.Inicio_Servicio);
                            }



                            if (oRecepcionVehiculo.Observaciones == null)
                            {
                                cmd.Parameters.AddWithValue("@Observaciones", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@Observaciones", oRecepcionVehiculo.Observaciones);
                            }


                          //@@identity obtien la ultima instancia de id creada en la base de datos

                            SqlParameter parametro = null;
                            if (oRecepcionVehiculo.ID_Recepcion == 0)
                            {
                                parametro = cmd.Parameters.Add("@@identity", SqlDbType.Int);
                                parametro.Direction = ParameterDirection.ReturnValue;
                            }
                            //se ejecuta la ultima instancia creada
                            rpta = cmd.ExecuteNonQuery();

                            //Se puede obtener la ultima entrada de id
                            if (oRecepcionVehiculo.ID_Recepcion == 0)
                            {
                                oRecepcionVehiculo.ID_Recepcion = (int)parametro.Value;
                               

                            } 
                            rpta = oRecepcionVehiculo.ID_Recepcion;
                           
                        }

                        
                          
                        using (SqlCommand cmd = new SqlCommand("EliminarRecepcionEquipamiento", cn, transaccion))
                        {
                                        cmd.CommandType = CommandType.StoredProcedure;
                                        cmd.Parameters.AddWithValue("@idR", oRecepcionVehiculo.ID_Recepcion);
                                        cmd.ExecuteNonQuery();

                        }
                            
                    

                        if (oRecepcionVehiculo.valor != null) { 
                            for (int i = 0; i < oRecepcionVehiculo.valor.Count; i++)
                            {
                               using (SqlCommand cmd = new SqlCommand("GuardarRecepcionEquipamiento", cn, transaccion))
                                  {
                                        cmd.CommandType = CommandType.StoredProcedure;
                                        cmd.Parameters.AddWithValue("@idR", oRecepcionVehiculo.ID_Recepcion);
                                        cmd.Parameters.AddWithValue("@idE", oRecepcionVehiculo.valor[i]);
                                        cmd.ExecuteNonQuery();
                                  }

                             }

                        }
                        
                        transaccion.Commit();
                    }
                 

                    cn.Close();
                }
                catch (Exception ex)
                {
                    rpta = 0;
                    cn.Close();
                }
            }
             
            return rpta;
        }

        


        public MostrarRecepcionCLS RecuperarRecepcion(int idR)
        {
            MostrarRecepcionCLS oMostrarRecepcionCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarRecepcion", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", idR);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posIDR = drd.GetOrdinal("ID_RECEPCION");
                            int posIDV = drd.GetOrdinal("ID_VEHICULO");
                            int posIDT = drd.GetOrdinal("ID_TRABAJADOR");
                            int posIDP = drd.GetOrdinal("ID_PAGO");
                            int posCustodia = drd.GetOrdinal("CUSTODIA");
                            int posInicio = drd.GetOrdinal("INICIO_SERVICIO");
                            int posFecha = drd.GetOrdinal("FECHA_RECEPCION");
                            int posFin = drd.GetOrdinal("FIN_SERVICIO");
                            int posBencina = drd.GetOrdinal("BENCINA");
                            int posUbicacion = drd.GetOrdinal("UBICACION");
                            int posLlave = drd.GetOrdinal("LLAVE");
                            int posDocumentos = drd.GetOrdinal("DOCUMENTOS");
                            int posKilomentraje = drd.GetOrdinal("KILOMETRAJE");
                            int posObs = drd.GetOrdinal("OBSERVACIONES");

                         
                            while (drd.Read())
                            {
                                oMostrarRecepcionCLS = new MostrarRecepcionCLS();
                                oMostrarRecepcionCLS.ID_Recepcion = drd.IsDBNull(posIDR) ? 0 :
                                    drd.GetInt32(posIDR);
                                oMostrarRecepcionCLS.ID_Vehiculo = drd.IsDBNull(posIDV) ? 0 :
                                    drd.GetInt32(posIDV);
                                oMostrarRecepcionCLS.ID_Trabajador = drd.IsDBNull(posIDT) ? 0 :
                                    drd.GetInt32(posIDT);
                                oMostrarRecepcionCLS.ID_Pago = drd.IsDBNull(posIDP) ? 0 :
                                   drd.GetInt32(posIDP);

                                oMostrarRecepcionCLS.Custodia = drd.IsDBNull(posCustodia) ? "" :
                                   drd.GetString(posCustodia);
                                oMostrarRecepcionCLS.Inicio_Servicio = drd.IsDBNull(posInicio) ? "" :
                                  drd.GetString(posInicio);
                                oMostrarRecepcionCLS.Fecha_Recepcion = drd.IsDBNull(posFecha) ? "" :
                                  drd.GetString(posFecha);
                                oMostrarRecepcionCLS.Fin_Servicio = drd.IsDBNull(posFin) ? "" :
                                 drd.GetString(posFin);
                                oMostrarRecepcionCLS.Bencina = drd.IsDBNull(posBencina) ? "" :
                                 drd.GetString(posBencina);
                                oMostrarRecepcionCLS.Ubicacion = drd.IsDBNull(posUbicacion) ? "" :
                                 drd.GetString(posUbicacion);
                                oMostrarRecepcionCLS.llave = drd.IsDBNull(posLlave) ? 0 :
                               drd.GetInt32(posLlave);
                                oMostrarRecepcionCLS.Documentos = drd.IsDBNull(posDocumentos) ? 0 :
                               drd.GetInt32(posDocumentos);
                                oMostrarRecepcionCLS.Kilometraje = drd.IsDBNull(posKilomentraje) ? 0 :
                               drd.GetInt32(posKilomentraje);
                                oMostrarRecepcionCLS.Observaciones = drd.IsDBNull(posObs) ? "" :
                                drd.GetString(posObs);

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
            return oMostrarRecepcionCLS;
        }

        public List<EquipamientoCLS> ListarRecepcionEquipamiento(int id)
        {
            List<EquipamientoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarRecepcionEquipamiento", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idR", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<EquipamientoCLS>();
                            EquipamientoCLS oEquipamientoCLS;
                            int posID = drd.GetOrdinal("ID_EQUIPAMIENTO");
                            int posNombre = drd.GetOrdinal("NOMBRE_EQUIPAMIENTO");
                            while (drd.Read())
                            {
                                oEquipamientoCLS = new EquipamientoCLS();
                                oEquipamientoCLS.ID_Equipamiento = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oEquipamientoCLS.Nombre_Equipamiento = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oEquipamientoCLS);
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

        public int EliminarRecepcion(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarRecepcion", cn))
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
