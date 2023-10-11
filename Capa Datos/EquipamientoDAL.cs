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
    public class EquipamientoDAL : CadenaDAL
    {

        public List<EquipamientoCLS> listarEquipamiento()
        {
            List<EquipamientoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarEquipamiento", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
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

        public EquipamientoCLS RecuperarEquipamiento(int id)
        {
            EquipamientoCLS oEquipamientoCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarEquipamiento", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_EQUIPAMIENTO");
                            int posNombre = drd.GetOrdinal("NOMBRE_EQUIPAMIENTO");
                            while (drd.Read())
                            {
                                oEquipamientoCLS = new EquipamientoCLS();
                                oEquipamientoCLS.ID_Equipamiento = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oEquipamientoCLS.Nombre_Equipamiento = drd.IsDBNull(posNombre) ? "" :
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
            return oEquipamientoCLS;
        }

        public int GuardarEquipamiento(EquipamientoCLS oEquipamiento)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarEquipamiento", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oEquipamiento.ID_Equipamiento);
                        cmd.Parameters.AddWithValue("@Nombre", oEquipamiento.Nombre_Equipamiento);
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

        public int EliminarEquipamiento(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("Eliminarquipamiento", cn))
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

        public List<EquipamientoCLS> VerificarEquipamiento(string nombreEquipamiento)
        {
            List<EquipamientoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("VerificarEquipamiento", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@nombreEquipamiento", nombreEquipamiento);
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

    }
}
