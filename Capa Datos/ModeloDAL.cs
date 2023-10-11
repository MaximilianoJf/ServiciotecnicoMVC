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
    public class ModeloDAL : CadenaDAL
    {
        public List<ModeloCLS> ListarModeloMarca(int id)
        {
            List<ModeloCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarModeloMarca", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ModeloCLS>();
                            ModeloCLS oModeloCLS;
                            int posID = drd.GetOrdinal("ID_MODELO");
                            int posNombre = drd.GetOrdinal("NOMBRE_MODELO");
                            while (drd.Read())
                            {
                                oModeloCLS = new ModeloCLS();
                                oModeloCLS.ID_Modelo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oModeloCLS.Nombre_Modelo = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oModeloCLS);
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


        public ModeloCLS RecuperarModelo(int id)
        {
            ModeloCLS oModeloCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarModelo", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_MARCA");
                            int posIDM = drd.GetOrdinal("ID_MODELO");
                            int posNombre = drd.GetOrdinal("NOMBRE_MODELO");
                            while (drd.Read())
                            {
                                oModeloCLS = new ModeloCLS();
                                oModeloCLS.ID_Marca= drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oModeloCLS.ID_Modelo = drd.IsDBNull(posIDM) ? 0 :
                                 drd.GetInt32(posIDM);
                                oModeloCLS.Nombre_Modelo = drd.IsDBNull(posNombre) ? "" :
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
            return oModeloCLS;
        }


        public int GuardarModelo(ModeloCLS oModelo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarModelo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oModelo.ID_Modelo);
                        cmd.Parameters.AddWithValue("@idM", oModelo.ID_Marca);
                        cmd.Parameters.AddWithValue("@Nombre", oModelo.Nombre_Modelo);
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


        public int EliminarModelo(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarModelo", cn))
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

        public List<ModeloCLS> VerificarModelo(string nombreModelo)
        {
            List<ModeloCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarModelo", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreModelo", nombreModelo);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            lista = new List<ModeloCLS>();
                            ModeloCLS oModeloCLS;
                            int posID = drd.GetOrdinal("ID_MODELO");
                            int posNombre = drd.GetOrdinal("NOMBRE_MODELO");
                            while (drd.Read())
                            {
                                oModeloCLS = new ModeloCLS();
                                oModeloCLS.ID_Modelo = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oModeloCLS.Nombre_Modelo = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oModeloCLS);
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
