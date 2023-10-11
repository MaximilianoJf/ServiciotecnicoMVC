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
    public class PagoDAL : CadenaDAL
    {
        public List<PagoCLS> ListarPago()
        {
            List<PagoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("listarPago", cn))
                    {
                        //Indicar que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<PagoCLS>();
                            PagoCLS oPagoCLS;
                            int posID = drd.GetOrdinal("ID_PAGO");
                            int posNombre = drd.GetOrdinal("ESTADO_PAGO");
                            while (drd.Read())
                            {
                                oPagoCLS = new PagoCLS();
                                oPagoCLS.ID_Pago = drd.IsDBNull(posID) ? 0 :
                                    drd.GetInt32(posID);
                                oPagoCLS.Estado_Pago = drd.IsDBNull(posNombre) ? "" :
                                    drd.GetString(posNombre);
                                lista.Add(oPagoCLS);
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
