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
    public class MarcaDAL : CadenaDAL
    {

        //public List<MarcaCLS> listarMarca()
        //{
        //    List<MarcaCLS> lista = new List<MarcaCLS>();
        //    lista.Add(new MarcaCLS
        //    {
        //        ID_Marca = 1,
        //        Nombre_Marca = "KIA"
        //    });

        //    lista.Add(new MarcaCLS
        //    {
        //        ID_Marca = 2,
        //        Nombre_Marca = "Chevrolet"
        //    });
        //    return lista;
        //}



        public List<MarcaCLS> ListarMarca()
        {
            List<MarcaCLS> lista = null;
          //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using(SqlConnection cn=new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using(SqlCommand cmd=new SqlCommand("listarMarca", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MarcaCLS>();
                            MarcaCLS oMarcaCLS;
                            int posID = drd.GetOrdinal("ID_MARCA");
                            int posNombre = drd.GetOrdinal("NOMBRE_MARCA");
                            while (drd.Read())
                            {
                                oMarcaCLS = new MarcaCLS();
                                oMarcaCLS.ID_Marca = drd.IsDBNull(posID) ? 0: 
                                    drd.GetInt32(posID);
                                oMarcaCLS.Nombre_Marca = drd.IsDBNull(posNombre) ? "":
                                    drd.GetString(posNombre);
                                lista.Add(oMarcaCLS);
                            }
                        }
                    }
                    cn.Close();
                }catch(Exception ex)
                {
                    cn.Close();
                }
                
            }
            return lista;
        }


        public MarcaCLS RecuperarMarca(int id)
        {
            MarcaCLS oMarcaCLS= null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarMarca", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_MARCA");
                            int posNombre = drd.GetOrdinal("NOMBRE_MARCA");
                            while (drd.Read())
                            {
                                oMarcaCLS = new MarcaCLS();
                                oMarcaCLS.ID_Marca = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMarcaCLS.Nombre_Marca = drd.IsDBNull(posNombre) ? "" :
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
            return oMarcaCLS;
        }



        public List<MarcaCLS> FiltrarMarca(string nombreMarca)
        {
            List<MarcaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("FiltrarMarca", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreMarca", nombreMarca);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MarcaCLS>();
                            MarcaCLS oMarcaCLS;
                            int posID = drd.GetOrdinal("ID_MARCA");
                            int posNombre = drd.GetOrdinal("NOMBRE_MARCA");
                            while (drd.Read())
                            {
                                oMarcaCLS = new MarcaCLS();
                                oMarcaCLS.ID_Marca = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMarcaCLS.Nombre_Marca = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oMarcaCLS);
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


        public int GuardarMarca(MarcaCLS oMarca)
        {
            int rpta = 0;
            using(SqlConnection cn=new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarMarca", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oMarca.ID_Marca);
                        cmd.Parameters.AddWithValue("@Nombre", oMarca.Nombre_Marca);
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


        public int Guardar(int id, string marca)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarMarca", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@Nombre", marca);
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


        public int EliminarMarca(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarMarca", cn))
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

        public List<MarcaCLS> VerificarMarca(string nombreMarca)
        {
            List<MarcaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarMarca", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreMarca", nombreMarca);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MarcaCLS>();
                            MarcaCLS oMarcaCLS;
                            int posID = drd.GetOrdinal("ID_MARCA");
                            int posNombre = drd.GetOrdinal("NOMBRE_MARCA");
                            while (drd.Read())
                            {
                                oMarcaCLS = new MarcaCLS();
                                oMarcaCLS.ID_Marca = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMarcaCLS.Nombre_Marca = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oMarcaCLS);
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

