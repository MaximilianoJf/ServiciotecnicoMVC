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
    public class ReparacionPresupuestoDAL : CadenaDAL
    {
        public List<ReparacionPresupuestoCLS> ListarReparacionPresupuesto(int id)
        {
            List<ReparacionPresupuestoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarPresupuestoReparacion", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idP", id);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ReparacionPresupuestoCLS>();
                            ReparacionPresupuestoCLS oReparacionPresupuestoCLS;
                            int posIDP = drd.GetOrdinal("ID_PRESUPUESTO");
                            int posIDR = drd.GetOrdinal("ID_REPARACION");
                            int posDetalle = drd.GetOrdinal("DETALLE");
                            int posValor = drd.GetOrdinal("VALOR");
                            int posObs = drd.GetOrdinal("OBSERVACION");
                            int posCant = drd.GetOrdinal("CANTIDAD");
                            while (drd.Read())
                            {
                                oReparacionPresupuestoCLS = new ReparacionPresupuestoCLS();
                                oReparacionPresupuestoCLS.ID_Presupuesto = drd.IsDBNull(posIDP) ? 0 :
                                   drd.GetInt32(posIDP);
                                oReparacionPresupuestoCLS.ID_Reparacion = drd.IsDBNull(posIDR) ? 0 :
                                    drd.GetInt32(posIDR);
                                oReparacionPresupuestoCLS.Detalle = drd.IsDBNull(posDetalle) ? "" :
                                    drd.GetString(posDetalle);
                                oReparacionPresupuestoCLS.Valor = drd.IsDBNull(posValor) ? 0 :
                                  drd.GetInt32(posValor);
                                oReparacionPresupuestoCLS.Observacion = drd.IsDBNull(posObs) ? "" :
                                   drd.GetString(posObs);
                                oReparacionPresupuestoCLS.Cantidad = drd.IsDBNull(posCant) ? 0 :
                                 drd.GetInt32(posCant);

                                lista.Add(oReparacionPresupuestoCLS);
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
