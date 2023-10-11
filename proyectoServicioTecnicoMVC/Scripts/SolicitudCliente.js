window.onload = function () {
    imprimirSolicitud()
}



function imprimirSolicitud() {
    var idC = document.getElementById("txtCliente").value
    var url = "WebsiteClient/Recuperarsolicitudcliente/?id=" + idC;


    fetchget(url, function (res) {
        var contenido = "";
       

        var encontrado = 0;
        var pos = 0;
        for (var j = 0; j < res.length; j++) {
            if (res[j].Estado == 1) {
                encontrado = 1;
                pos = j;
                break;
            }
        }


        if (Object.keys(res).length == 0 || encontrado == 0) {
            contenido += "<div id='SolicitudInfo' class='SolicitudNInfo'><img width='200' heigh='200' src='../../img/alerta.png' alt='Image'>";
            contenido += "<h4>No tiene ninguna solicitud registrada</h4>";
        
            contenido += "</div>";
           
            document.getElementById("SolicitudInfo").innerHTML = contenido;
            document.getElementById("btnReservar").style.display = "";
            document.getElementById("btnCancelar").style.display = "none";
            
        } else {

            contenido += "<div id='SolicitudInfo' class='SolicitudInfo'>";
   

            contenido += "<img width='180' heigh='180' src='../../img/info.png' alt='Image'>";
            contenido += "<div class='infoData'><p class='tituloInfo'>Información de hora reservada</p>";

     

            var estado;
            if (res[pos].Estado == 1) {
                estado = "Vigente";
            } else {
                estado = "Cancelada"
            }
      
            contenido += `<div class="SolicitudDatos">
                            <div class="titulosDatos">
                                <p class="SolicitudP" ><i class="fa-solid fa-calendar-day" style="margin-right:5px;"></i>Fecha</p> <p class="SolicitudP margin">${res[pos].Fecha_Agendamiento}</p>
                                <p class="SolicitudP" ><i class="fa-solid fa-clock" style="margin-right:5px;"></i>Horario</p> <p class="SolicitudP margin" >${res[pos].Hora_Inicio} - ${res[0].Hora_Fin}</p>
                                <p class="SolicitudP" ><i class="fa-solid fa-calendar-check" style="margin-right:5px;"></i>Estado</p> <p class="SolicitudP margin">${estado}</p>
                            </div>
                           
                        
                          </div>`;
            contenido += "</div>"
            contenido += "</div>";


            document.getElementById("SolicitudInfo").innerHTML = contenido;
            document.getElementById("btnCancelar").style.display = "";
            document.getElementById("btnReservar").style.display = "none";
        }
    })
}

function Reservar() {
    document.location.href = setUrl("WebsiteClient/AgendamientoHora");
}

function Cancelar() {
    Confimacion("¿Esta segur@ que desea cancelar la hora?", "Confirmación", function (rpta) {
       
    });
}

function CambiarEstado(id) {
    var url = "WebsiteClient/CancelarAgendamientoHora/?id=" + id + "&estado=0";
    fetchget(url, function (res) {
     
        document.location.href = setUrl("WebsiteClient/Solicitud");
    })
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



var recuperado;
function Confimacion(texto = "¿Desea guardar los cambios?", tittle = "Confirmación", callback) {
    return Swal.fire({
        title: tittle,
        text: texto,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            var idC = document.getElementById("txtCliente").value
            var url = "WebsiteClient/Recuperarsolicitudcliente/?id=" + idC;


            fetchget(url, function (res) {


                var encontrado = 0;
                var pos = 0;
                for (var j = 0; j < res.length; j++) {
                    if (res[j].Estado == 1) {
                        encontrado = 1;
                        pos = j;
                        break;
                    }
                }

                recuperado = res[pos]; 

            })

            delay(1000).then(() => CambiarEstado(recuperado.ID_Agendamiento));
            
         

        }
    })
}


function Select(id) {
    var url = "Recepcion/DatosSession/?id=" + id;
    

    fetchget(url, function (res) {
   
        if (res.ID_Recepcion == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("WebsiteClient/AgendamientoHora");
        }
    })


}



function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


