using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;
using System.Net;
using Capa_Negocio;
using Capa_Entidad;

namespace proyectoServicioTecnicoMVC.Controllers
{
    public class EnviarMailController : Controller
    {
        // GET: EviarMail
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SendMailToAdm(string mail)
        {
            AutomotrizBL oAutomotriz = new AutomotrizBL();
            AutomotrizCLS objeto = oAutomotriz.RecuperarAutomotrizRegisterClient();
            bool result = false;
            if (objeto.Mail_Automotriz == mail)
            {

                objeto.Clave_Web = oAutomotriz.RecuperarAutomotriz(objeto.ID_Automotriz).Clave_Web;
                result = SendEmail(mail, "Recuperación de contraseña", "Sus datos de acceso son: </br>E-Mail: " + objeto.Mail_Automotriz + ",</br>Contraseña: " + objeto.Clave_Web);
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

      
        public JsonResult SendMailToUser(string mail)
        {
            ClienteBL oCliente = new ClienteBL();
            bool result = false;
            if (oCliente.RecuperarClienteMail(mail).Count != 0)
            {
                ClienteCLS objeto = oCliente.RecuperarClienteMail(mail)[0];
                if(oCliente.Recuperarcliente(objeto.ID_Cliente).Clave_Cliente == "")
                {

                    Random rnd = new Random();
                    string pass = "";
              

                    for(int i=0;i< 10; i++)
                    {
                        pass = pass +rnd.Next(1, 11);
                    }

                    oCliente.RandomPass(objeto.ID_Cliente, pass,"Usuario");

                    result = SendEmail(mail, "Recuperación de contraseña", "Sus datos de acceso son: </br>E-Mail: " + objeto.Mail_Cliente + ",</br>Contraseña: " + pass);
                }
                else
                {
                   
                    result = SendEmail(mail, "Recuperación de contraseña", "Sus datos de acceso son: </br>E-Mail: " + objeto.Mail_Cliente + ",</br>Contraseña: " + objeto.Clave_Cliente);
                     
                }
                objeto.Clave_Cliente = oCliente.Recuperarcliente(objeto.ID_Cliente).Clave_Cliente;
               
            }
          
          
           
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public bool SendEmail(string toEmail,string suject,string emailBody)
        {
            try
            {
                string senderEmail = "automotrizrobertocaviedes@gmail.com";
                string senderPassword = "fkzrncgmfzcdupxu";
                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Timeout = 100000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(senderEmail, senderPassword);


                MailMessage mailMessage = new MailMessage(senderEmail, toEmail, suject, emailBody);
                mailMessage.IsBodyHtml = true;
                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                client.Send(mailMessage);

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }












    }
}