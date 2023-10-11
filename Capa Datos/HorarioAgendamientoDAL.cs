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
    public class HorarioAgendamientoDAL : CadenaDAL
    {
        public List<MostrarSolicitudCLS> ListarSolicitudFecha(string fecha)
        {
            List<MostrarSolicitudCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarSolicitud", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@fecha", fecha);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarSolicitudCLS>();
                            MostrarSolicitudCLS oMostrarSolicitudCLS;
                            int posID = drd.GetOrdinal("ID_HORARIO");
                            int posIDA = drd.GetOrdinal("ID_AGENDAMIENTO");
                            int posDia = drd.GetOrdinal("DIA_SEMANAL");
                            int posFin = drd.GetOrdinal("HORA_FIN");
                            int posInicio = drd.GetOrdinal("HORA_INICIO");
                            int posFecha = drd.GetOrdinal("FECHA_AGENDAMIENTO");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posFono = drd.GetOrdinal("FONO_CLIENTE");
                            int posEstado = drd.GetOrdinal("ESTADO_AGENDAMIENTO");
                            while (drd.Read())
                            {
                                oMostrarSolicitudCLS = new MostrarSolicitudCLS();
                                oMostrarSolicitudCLS.ID_Horario = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMostrarSolicitudCLS.ID_Agendamiento = drd.IsDBNull(posIDA) ? 0 :
                                   drd.GetInt32(posIDA);
                                oMostrarSolicitudCLS.Dia_Semanal = drd.IsDBNull(posDia) ? "" :
                                    drd.GetString(posDia);
                                oMostrarSolicitudCLS.Hora_Fin = drd.IsDBNull(posFin) ? "" :
                                   drd.GetString(posFin);
                                oMostrarSolicitudCLS.Hora_Inicio = drd.IsDBNull(posInicio) ? "" :
                                   drd.GetString(posInicio);
                                oMostrarSolicitudCLS.Fecha_Agendamiento = drd.IsDBNull(posFecha) ? "" :
                                 drd.GetString(posFecha);
                                oMostrarSolicitudCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                 drd.GetString(posNombre);
                                oMostrarSolicitudCLS.Fono_Cliente = drd.IsDBNull(posFono) ? 0 :
                                 drd.GetInt32(posFono);
                                oMostrarSolicitudCLS.Estado = drd.IsDBNull(posEstado) ? 0 :
                                drd.GetInt32(posEstado);
                                lista.Add(oMostrarSolicitudCLS);
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

        public List<MostrarSolicitudCLS> ListarSolicitudCliente(string id)
        {
            List<MostrarSolicitudCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("RecuperarAgendamientoCliente", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<MostrarSolicitudCLS>();
                            MostrarSolicitudCLS oMostrarSolicitudCLS;
                            int posID = drd.GetOrdinal("ID_HORARIO");
                            int posIDA = drd.GetOrdinal("ID_AGENDAMIENTO");
                            int posIDC = drd.GetOrdinal("ID_CLIENTE");
                            int posDia = drd.GetOrdinal("DIA_SEMANAL");
                            int posFin = drd.GetOrdinal("HORA_FIN");
                            int posInicio = drd.GetOrdinal("HORA_INICIO");
                            int posFecha = drd.GetOrdinal("FECHA_AGENDAMIENTO");
                            int posNombre = drd.GetOrdinal("NOMBRE_CLIENTE");
                            int posEstado = drd.GetOrdinal("ESTADO_AGENDAMIENTO");
                            while (drd.Read())
                            {
                                oMostrarSolicitudCLS = new MostrarSolicitudCLS();
                                oMostrarSolicitudCLS.ID_Horario = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oMostrarSolicitudCLS.ID_Agendamiento = drd.IsDBNull(posIDA) ? 0 :
                                   drd.GetInt32(posIDA);
                                oMostrarSolicitudCLS.ID_Cliente = drd.IsDBNull(posIDC) ? 0 :
                                  drd.GetInt32(posIDC);
                                oMostrarSolicitudCLS.Dia_Semanal = drd.IsDBNull(posDia) ? "" :
                                    drd.GetString(posDia);
                                oMostrarSolicitudCLS.Hora_Fin = drd.IsDBNull(posFin) ? "" :
                                   drd.GetString(posFin);
                                oMostrarSolicitudCLS.Hora_Inicio = drd.IsDBNull(posInicio) ? "" :
                                   drd.GetString(posInicio);
                                oMostrarSolicitudCLS.Fecha_Agendamiento = drd.IsDBNull(posFecha) ? "" :
                                 drd.GetString(posFecha);
                                oMostrarSolicitudCLS.Nombre_Cliente = drd.IsDBNull(posNombre) ? "" :
                                 drd.GetString(posNombre);
                                oMostrarSolicitudCLS.Estado = drd.IsDBNull(posEstado) ? 0 :
                                drd.GetInt32(posEstado);
                                lista.Add(oMostrarSolicitudCLS);
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
