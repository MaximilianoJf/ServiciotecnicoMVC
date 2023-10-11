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
    public class PresupuestoVehiculoDAL : CadenaDAL
    {

        public int GuardarPresupuesto(PresupuestoVehiculoCLS oPresupuestoVehiculo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlTransaction transaccion = cn.BeginTransaction())
                    {


                        using (SqlCommand cmd = new SqlCommand("GuardarPresuesto", cn, transaccion))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@id", oPresupuestoVehiculo.ID_Presupuesto);
                            cmd.Parameters.AddWithValue("@idV", oPresupuestoVehiculo.ID_Vehiculo);
                            cmd.Parameters.AddWithValue("@Validez", oPresupuestoVehiculo.Validez);
                            //cmd.Parameters.AddWithValue("@FechaP", oPresupuestoVehiculo.Fecha_Presupuesto);
                            //cmd.Parameters.AddWithValue("@Observaciones", oPresupuestoVehiculo.Observaciones);

                            if (oPresupuestoVehiculo.Observaciones == null)
                            {
                                cmd.Parameters.AddWithValue("@Observaciones", DBNull.Value);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@Observaciones", oPresupuestoVehiculo.Observaciones);
                            }


                            if (oPresupuestoVehiculo.Fecha_Presupuesto.Year == 1)
                            {
                                cmd.Parameters.AddWithValue("@FechaP", DateTime.Now);
                            }
                            else
                            {
                                cmd.Parameters.AddWithValue("@FechaP", oPresupuestoVehiculo.Fecha_Presupuesto);
                            }


                          
                            //@@identity obtien la ultima instancia de id creada en la base de datos

                            SqlParameter parametro = null;
                            if (oPresupuestoVehiculo.ID_Presupuesto == 0)
                            {
                                parametro = cmd.Parameters.Add("@@identity", SqlDbType.Int);
                                parametro.Direction = ParameterDirection.ReturnValue;
                            }
                            //se ejecuta la ultima instancia creada
                            rpta = cmd.ExecuteNonQuery();

                            //Se puede obtener la ultima entrada de id
                            if (oPresupuestoVehiculo.ID_Presupuesto == 0)
                            {
                                oPresupuestoVehiculo.ID_Presupuesto = (int)parametro.Value;


                            }
                            rpta = oPresupuestoVehiculo.ID_Presupuesto;

                        }

                        using (SqlCommand cmd = new SqlCommand("EliminarPresupuestoReparacion", cn, transaccion))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@idP", oPresupuestoVehiculo.ID_Presupuesto);
                            cmd.ExecuteNonQuery();

                        }

                        if (oPresupuestoVehiculo.valor != null)
                        {
                            for (int i = 0; i < oPresupuestoVehiculo.valor.Count; i++)
                            {
                                using (SqlCommand cmd = new SqlCommand("GuardarReparacionPresupuesto", cn, transaccion))
                                {
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.AddWithValue("@idP", oPresupuestoVehiculo.ID_Presupuesto);
                                    cmd.Parameters.AddWithValue("@idR", oPresupuestoVehiculo.valor[i]);
                                    cmd.Parameters.AddWithValue("@observaciones", oPresupuestoVehiculo.obs[i]);
                                    cmd.Parameters.AddWithValue("@cantidad", oPresupuestoVehiculo.cant[i]);
                              
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

        public MostrarPresupuestoCLS RecuperarPresupuesto(int idP)
        {
            MostrarPresupuestoCLS oMostrarPresupuestoCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarPresupuesto", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idP", idP);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posIDP = drd.GetOrdinal("ID_PRESUPUESTO");
                            int posIDV = drd.GetOrdinal("ID_VEHICULO");
                            int posFechaP = drd.GetOrdinal("FECHA_PRESUPUESTO");
                            int posObs = drd.GetOrdinal("OBSERVACIONES");
                            int posValidez = drd.GetOrdinal("VALIDEZ");

                            while (drd.Read())
                            {
                                oMostrarPresupuestoCLS = new MostrarPresupuestoCLS();
                                oMostrarPresupuestoCLS.ID_Presupuesto = drd.IsDBNull(posIDP) ? 0 :
                                    drd.GetInt32(posIDP);
                                oMostrarPresupuestoCLS.ID_Vehiculo = drd.IsDBNull(posIDV) ? 0 :
                                    drd.GetInt32(posIDV);
                                oMostrarPresupuestoCLS.Observaciones = drd.IsDBNull(posObs) ? "" :
                                    drd.GetString(posObs);
                                oMostrarPresupuestoCLS.Fecha_Presupuesto = drd.IsDBNull(posFechaP) ? "" :
                                   drd.GetString(posFechaP);
                                oMostrarPresupuestoCLS.Validez = drd.IsDBNull(posValidez) ? "" :
                                  drd.GetString(posValidez);


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
            return oMostrarPresupuestoCLS;
        }


        public List<MostrarPresupuestoCLS> ListarPresupuestoVehiculo(int id)
        {
            List<MostrarPresupuestoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("ListarPresupuestoVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarPresupuestoCLS>();
                            MostrarPresupuestoCLS oPresupuestoVehiculoCLS;

                            int posID = drd.GetOrdinal("ID_PRESUPUESTO");
                            int posModelo = drd.GetOrdinal("MARCA_MODELO");
                            int posFecha = drd.GetOrdinal("FECHA_PRESUPUESTO");
                            int posValidez = drd.GetOrdinal("VALIDEZ");

                            while (drd.Read())
                            {
                                oPresupuestoVehiculoCLS = new MostrarPresupuestoCLS();

                                oPresupuestoVehiculoCLS.ID_Presupuesto = drd.IsDBNull(posID) ? 0 :
                                 drd.GetInt32(posID);

                                oPresupuestoVehiculoCLS.Modelo_Marca = drd.IsDBNull(posModelo) ? "" :
                                drd.GetString(posModelo);
                                oPresupuestoVehiculoCLS.Validez = drd.IsDBNull(posValidez) ? "" :
                               drd.GetString(posValidez);
                                oPresupuestoVehiculoCLS.Fecha_Presupuesto = drd.IsDBNull(posFecha) ? "" :
                               drd.GetString(posFecha);

                                lista.Add(oPresupuestoVehiculoCLS);
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


        public List<MostrarPresupuestoCLS> ListarPresupuestoVehiculoFecha(int id, string Fecha)
        {
            List<MostrarPresupuestoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("FiltrarPresupuesto", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@fecha", Fecha);
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarPresupuestoCLS>();
                            MostrarPresupuestoCLS oPresupuestoVehiculoCLS;

                            int posID = drd.GetOrdinal("ID_PRESUPUESTO");
                            int posModelo = drd.GetOrdinal("MARCA_MODELO");
                            int posFecha = drd.GetOrdinal("FECHA_PRESUPUESTO");
                            int posValidez = drd.GetOrdinal("VALIDEZ");

                            while (drd.Read())
                            {
                                oPresupuestoVehiculoCLS = new MostrarPresupuestoCLS();

                                oPresupuestoVehiculoCLS.ID_Presupuesto = drd.IsDBNull(posID) ? 0 :
                                 drd.GetInt32(posID);

                                oPresupuestoVehiculoCLS.Modelo_Marca = drd.IsDBNull(posModelo) ? "" :
                                drd.GetString(posModelo);
                                oPresupuestoVehiculoCLS.Validez = drd.IsDBNull(posValidez) ? "" :
                               drd.GetString(posValidez);
                                oPresupuestoVehiculoCLS.Fecha_Presupuesto = drd.IsDBNull(posFecha) ? "" :
                               drd.GetString(posFecha);

                                lista.Add(oPresupuestoVehiculoCLS);
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

        public int EliminarPresupuesto(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarPresupuesto", cn))
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
