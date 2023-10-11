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
    public class AgendamientoHoraDAL : CadenaDAL
    {

        public int GuardarAgendamientoHora(int id, int idC,int idH, DateTime fecha)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlTransaction transaccion = cn.BeginTransaction())
                    {


                        using (SqlCommand cmd = new SqlCommand("GuardarAgendamientoHora", cn, transaccion))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@id", id);
                            cmd.Parameters.AddWithValue("@idC", idC);
                            cmd.Parameters.AddWithValue("@fecha", fecha);
                            cmd.Parameters.AddWithValue("@estado", 1);
                   

                            //@@identity obtien la ultima instancia de id creada en la base de datos

                            SqlParameter parametro = null;
                            if (id == 0)
                            {
                                parametro = cmd.Parameters.Add("@@identity", SqlDbType.Int);
                                parametro.Direction = ParameterDirection.ReturnValue;
                            }
                            //se ejecuta la ultima instancia creada
                            rpta = cmd.ExecuteNonQuery();

                            //Se puede obtener la ultima entrada de id
                            if (id == 0)
                            {
                                id = (int)parametro.Value;


                            }
                            rpta = id;

                        }


                                using (SqlCommand cmd = new SqlCommand("GuardarHorarioAgedamiento", cn, transaccion))
                                {
                                    cmd.CommandType = CommandType.StoredProcedure;
                                    cmd.Parameters.AddWithValue("@idA", id);
                                    cmd.Parameters.AddWithValue("@idH", idH);
                                    cmd.ExecuteNonQuery();
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
        public int CancelarAgendamientoHora(int id, int estado)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                   


                        using (SqlCommand cmd = new SqlCommand("CancelarAgendamientoHora", cn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.AddWithValue("@id", id);
                            cmd.Parameters.AddWithValue("@estado", estado);
                            rpta = cmd.ExecuteNonQuery();
                            cn.Close();
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

        public int EliminarExpiradas()
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("EliminarExpiradas", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        rpta = cmd.ExecuteNonQuery();
                    }
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;
        }
    }
}
