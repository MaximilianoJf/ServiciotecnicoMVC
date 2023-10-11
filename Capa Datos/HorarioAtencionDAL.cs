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
    public class HorarioAtencionDAL : CadenaDAL
    {
        public List<MostrarHorarioCLS> ListarHorarioDia(string dia)
        {
            List<MostrarHorarioCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarHorario", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@dia", dia);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarHorarioCLS>();
                            MostrarHorarioCLS oMostrarHorarioCLS;
                            int posID = drd.GetOrdinal("ID_HORARIO");
                            int posDia = drd.GetOrdinal("DIA_SEMANAL");
                            int posFin = drd.GetOrdinal("HORA_FIN");
                            int posInicio = drd.GetOrdinal("HORA_INICIO");
                            while (drd.Read())
                            {
                                oMostrarHorarioCLS = new MostrarHorarioCLS();
                                oMostrarHorarioCLS.ID_Horario = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMostrarHorarioCLS.Dia_Semanal = drd.IsDBNull(posDia) ? "" :
                                    drd.GetString(posDia);
                                oMostrarHorarioCLS.Hora_Fin = drd.IsDBNull(posFin) ? "" :
                                   drd.GetString(posFin);
                                oMostrarHorarioCLS.Hora_Inicio = drd.IsDBNull(posInicio) ? "" :
                                   drd.GetString(posInicio);
                                lista.Add(oMostrarHorarioCLS);
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

        public int EliminarHorario(int id)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarHorario", cn))
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

        public int GuardarHorario(HorarioAtencionCLS oHorarioAtencion)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("GuardarHorario", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oHorarioAtencion.ID_Horario);
                        cmd.Parameters.AddWithValue("@HoraFin", oHorarioAtencion.Hora_Fin);
                        cmd.Parameters.AddWithValue("@HoraInicio", oHorarioAtencion.Hora_Inicio);
                        cmd.Parameters.AddWithValue("@dia", oHorarioAtencion.Dia_Semanal);
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

        public MostrarHorarioCLS RecuperarHorario(int id)
        {
            MostrarHorarioCLS oHorarioAtencionCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarHorario", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            int posID = drd.GetOrdinal("ID_HORARIO");
                            int posInicio = drd.GetOrdinal("HORA_INICIO");
                            int posFin = drd.GetOrdinal("HORA_FIN");
                            int posDia = drd.GetOrdinal("DIA_SEMANAL");
                            while (drd.Read())
                            {
                                oHorarioAtencionCLS = new MostrarHorarioCLS();
                                oHorarioAtencionCLS.ID_Horario = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oHorarioAtencionCLS.Hora_Fin = drd.IsDBNull(posFin) ? "" :
                                    drd.GetString(posFin);
                                oHorarioAtencionCLS.Hora_Inicio = drd.IsDBNull(posInicio) ? "" :
                                  drd.GetString(posInicio);
                                oHorarioAtencionCLS.Dia_Semanal = drd.IsDBNull(posDia) ? "" :
                                  drd.GetString(posDia);

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
            return oHorarioAtencionCLS;
        }



    }
}
