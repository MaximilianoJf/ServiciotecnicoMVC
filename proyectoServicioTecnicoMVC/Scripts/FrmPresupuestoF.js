window.onload = function () {
    listarReparaciones()
}


/*text area*/

const messageElement = document.getElementById("message");
const countElement = document.getElementById("counter");

messageElement.addEventListener("input", function (e) {
    const target = e.target;

    // Get the `maxlength` attribute
    const maxLength = target.getAttribute("maxlength");

    // Count the current number of characters
    const currentLength = target.value.length;

    countElement.innerHTML = `${currentLength}/${maxLength}`;

    if (currentLength > 100) {
        countElement.style.backgroundColor = "#f00";
    } else {
        countElement.style.backgroundColor = "#48C5B5";
    }
});

/*text area*/

function listarReparaciones() {
    pintar({
        //popup: true,
        //idPopup: "exampleModal",
        url: "Reparaciones/lista",
        id: "divTabla",
        cabeceras: ["Reparación", "Valor"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: ["Detalle", "Valor"],
        eliminar: false,
        editar: false,
        seleccionar: false,
        check:true,
        propiedadId: "ID_Reparacion"
    })
}

function pintar(objConfiguracion, objBusqueda) {

    //url absoluta

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + objConfiguracion.url;

    /*    alert(urlAbsoluta);*/

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(res => {
            var contenido = "";

            if (objConfiguracion.id == undefined) {
                objConfiguracion.id = "divTabla";
            }
            if (objConfiguracion.editar == undefined) {
                objConfiguracion.editar = false;
            }
            if (objConfiguracion.eliminar == undefined) {
                objConfiguracion.eliminar = false;
            }
            if (objConfiguracion.seleccionar == undefined) {
                objConfiguracion.seleccionar = false;
            }
            if (objConfiguracion.popup == undefined) {
                objConfiguracion.popup = false;
            }

            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined) {
                    objBusqueda.placeholder = "Ingrese un valor";
                }
                if (objBusqueda.id == undefined) {
                    objBusqueda.id = "txtbusqueda";
                }
                if (objBusqueda.type == undefined) {
                    objBusqueda.type = "text";
                }

                //asignar valores
                objConfiguracionGlobal = objConfiguracion;
                objBusquedaGLobal = objBusqueda;

                contenido += `<div class="seccionBusqueda">`;
                contenido += `
                    <p class=textBusqueda>Buscar</p>
                    <div class="search">
                        <i id="search-icon" class='bx bx-search-alt'></i>
                        <input id="${objBusqueda.id}" placeholder="${objBusqueda.placeholder}" onkeyup="buscar()" class="casillaB" type="text">
                    </div>`
                /*contenido +=`
                    <select>
                        <option>Patente</option>
                        <option>Modelo</option>
                    </select>`*/

                contenido += `</div>`



            }
            contenido += "<div id='divContenedor' class='divContenedor'>";
            contenido += generarTablaR(objConfiguracion, res)
            contenido += "</div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;


        })
}

function generarTablaR(objConfiguracion, res) {
    var contenido = "";
    contenido += "<div class='scroll-window-wrapper'>";
    contenido += "<div class='scroll-window'>";
    contenido += "<table class='table table-striped table-hover user-list fixed-header'>";
    contenido += "<thead>";
    for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
        contenido += "<th><div>" + objConfiguracion.cabeceras[j] + "</div></th>";
    }
    if (objConfiguracion.subtabla == true || objConfiguracion.editar == true || objConfiguracion.eliminar == true || objConfiguracion.seleccionar == true) {
        contenido += `<th><div></div></th>`
    }

    if (objConfiguracion.check == true) {
        contenido += `<th><div>Selección</div></th>`
        contenido += `<th><div>Observaciones</div></th>`
        contenido += `<th><div>Cantidad</div></th>`
    }

    contenido += "<tbody>";
    var fila;
    var propiedadActual;
    for (var i = 0; i < res.length; i++) {
        fila = res[i]
        contenido += `<tr colspan='` + objConfiguracion.colspan + `'>`;
        for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
            propiedadActual = objConfiguracion.propiedades[j]
            if (objConfiguracion.propiedades[j] == "Valor") {
                contenido += "<td>$" + fila[propiedadActual] + "</td>";
            } else {
                contenido += "<td>" + fila[propiedadActual] + "</td>";
            }
          


        }
        if (objConfiguracion.subtabla == true || objConfiguracion.check == true|| objConfiguracion.eliminar == true || objConfiguracion.editar == true || objConfiguracion.seleccionar == true) {
            contenido += "<td>";
            if (objConfiguracion.editar == true) {
                if (objConfiguracion.popup == true) {
                    contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' data-toggle="modal" data-target="#${objConfiguracion.idPopup}"><i class='bx bxs-edit'></i></button>`;
                } else {
                    contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info'><i class='bx bxs-edit'></i></button>`;
                }

            }
            if (objConfiguracion.eliminar == true) {
                contenido += `<Button type="button" onclick='Eliminar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info'><i class='bx bx-trash'></i></button>`;
            }
            if (objConfiguracion.subtabla == true) {
                contenido += `<button type="button" class='btn btn-info' onclick='mostrarSubTabla(${i})'><i id='icon-` + i + `' class='bx bx-chevron-down'></i>`;
            }
            if (objConfiguracion.seleccionar == true) {
                contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select'>Seleccionar</i></button>`;
            }
            if (objConfiguracion.check == true) {
                contenido += `<input type="checkbox" id='check-${fila[objConfiguracion.propiedadId]}' onclick='cambiarCheck(${fila[objConfiguracion.propiedadId]});' style='width:50px;' value='${fila[objConfiguracion.propiedadId]}' name='valor[]'>`;
            }

            contenido += "</td>";
            if (objConfiguracion.check == true) {
                contenido += "<td>";
                contenido += `<div id='text-${fila[objConfiguracion.propiedadId]}' >
                             <textarea class='form-control' maxlength="150" style='height:40px;' disabled></textarea>
                             </div>`;
                contenido += "</td>";
                contenido += "<td>";
                contenido += `<div id='select-${fila[objConfiguracion.propiedadId]}'>
                                <select class='form-select' style='width:60px; height:40px;' disabled>
                                <option value='1' selected>0</option>
                              </select>
                              </div>`;
                contenido += "</td>";
            }
            contenido += "</tr>";
            contenido += "<tr id='display-" + i + "' class='hideTable'>";
         
        
        

        } else {
            contenido += "</tr>";
        }

    }
    contenido += "</tbody>";
    contenido += "</table>";
    contenido += "</div>";
    contenido += "</div>";
    return contenido;
}


function cambiarCheck(id) {
    
    var checkid = "check-" + id;
    var check = document.getElementById(checkid);
    var textid = "text-" + id;
    var area = document.getElementById(textid);
    var selectid = "select-" + id;
    var select = document.getElementById(selectid);

    if (check.checked == true) {

        area.innerHTML = `
                             <textarea class='form-control' name='obs[]' maxlength="150"  style='height:40px; overflow:auto;' ></textarea>
                          `;
        select.innerHTML = `
                                <select class='form-select' style='width:60px;'  style='width:60px; height:40px;' name='cant[]'>
                                <option value='1' selected>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                              </select>
                              `;
    } else {
        area.innerHTML = `
                             <textarea class='form-control' maxlength="150"  style='height:40px;'   disabled></textarea>
                             `;

        select.innerHTML = `
                                <select class='form-select' style='width:60px;'  style='width:60px; height:40px;' disabled>
                                <option selected>0</option>
                              </select>
                            `;
    }


    //if (check.checked == true) {
       
    //    area.innerHTML = `<div id='text-${id}'>
    //                         <textarea class='form-control' name='obs[]'></textarea>
    //                         </div>`;
    //    select.innerHTML = `<div id='select-${id}' >
    //                            <select class='form-select' style='width:60px;' name='cant[]>
    //                            <option value='1' selected>1</option>
    //                            <option value='2'>2</option>
    //                            <option value='3'>3</option>
    //                            <option value='4'>4</option>
    //                            <option value='5'>5</option>
    //                            <option value='6'>6</option>
    //                          </select>
    //                          </div>`;
    //} else {
    //    area.innerHTML = `<div id='text-${id}'>
    //                         <textarea class='form-control' readonly></textarea>
    //                         </div>`;

    //    select.innerHTML = `<div id='select-${id}'>
    //                            <select class='form-select' style='width:60px;' disabled>
    //                            <option selected>0</option>
    //                          </select>
    //                          </div>`;
    //}


}




function mostrarSubTabla(id) {
    let display = 'display-' + id;
    let icon = 'icon-' + id;
    //console.log(icon);
    //console.log(display);
    let collapseModel = document.getElementById(display);
    /*  console.log(collapseModel);*/
    let arrow = document.getElementById(icon);
    /*    console.log(arrow);*/


    if (collapseModel.className == "showTable") {
        collapseModel.className = "hideTable";
        arrow.className = "bx bx-chevron-down"
    } else {
        let tablesDisable = document.querySelectorAll(".showTable");
        let arrowDisable = document.querySelectorAll(".bx.bx-chevron-up");
        //console.log(arrowDisable);
        //console.log(tablesDisable);
        for (var i = 0; i < tablesDisable.length; i++) {
            tablesDisable[i].className = "hideTable";
            arrowDisable[i].className = "bx bx-chevron-down";
        }
        collapseModel.className = "showTable";
        arrow.className = "bx bx-chevron-up";

    }

}

function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
    $('textarea').removeClass('is-valid');
    $('textarea').removeClass('is-invalid');
}




function validarDatos() {
    var val = 0;

    if (document.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
        Error("Ingrese a lo menos una reparación para el vehiculo");
        val = 1
    } else {
        val = 0
    }

    if (document.getElementById("txtFechaPresupuesto").value == "") {
        document.getElementById("txtFechaPresupuesto").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtFechaPresupuesto").className = "form-control is-valid";
    }

    if (document.getElementById("txtValidez").value == "") {
        document.getElementById("txtValidez").className = "form-control is-invalid";
        document.getElementById("invalid-Validez").innerHTML = 'Ingrese una fecha de validez del presupuesto'
        val = 1;

    } else {
        if (document.getElementById("txtValidez").value < document.getElementById("txtFechaPresupuesto").value) {
            document.getElementById("txtValidez").className = "form-control is-invalid";
            document.getElementById("invalid-Validez").innerHTML = 'La fecha de validez no puede ser menor a la de presupuesto'
            val = 1;
        } else {
            document.getElementById("txtValidez").className = "form-control is-valid";
        }
      
    }

    if (document.getElementById("message").value == "" || document.getElementById("message").value != "") {
        document.getElementById("message").className = "form-control is-valid";
    } 

    

    return val
}



function GuardarDatos() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);
    if (validarDatos() == 0) {
        fetchPostText("Presupuesto/GuardarDatos", frm, function (res) {
                if (res != "0") {

              
                    Correcto("Se realizo exitosamente");
                    document.location.href = setUrl("Presupuesto/FrmPVista");

                }
            })
    }
    


}



function Limpiar() {
 
    LimpiarDatos("frmRecepción", "ID_Presupuesto", ["ID_Vehiculo","Fecha_Presupuesto","cant[]","obs[]","valor[]"]);
   /* listarReparaciones()*/
    const countElement = document.getElementById("counter");


 
    // Count the current number of characters
    const currentLength = "0";

    countElement.innerHTML = `${currentLength}/${150}`;

    if (currentLength > 100) {
        countElement.style.backgroundColor = "#f00";
    } else {
        countElement.style.backgroundColor = "#48C5B5";
    }

    removeVal(); 

}

function Editar(id) {


    /*recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", ["Color"]);*/
    recuperarAuto("Vehiculo/RecuperarVehiculo/?id=" + id, "frmRecepción", ["ID_Cliente"])
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}


//function Select(id) {
//    var url = "Vehiculo/DatosSession/?id=" + id;


//    fetchget(url, function (res) {
//        if (res.ID_Vehiculo == 0) {
//            Error("No se encontro");
//        } else {
//            Correcto("Vamos");
//            document.location.href = setUrl("Recepcion/FrmRFormulario");
//        }
//    })

//    /*recuperarGenerico("Cliente/DatosSession/?id=" + id, "frmRecepción" *//*,["ID_AUTOMOTRIZ", "MAIL_CLIENTE", "USUARIO_CLIENTE","CLAVE_CLIENTE"]*//*);*/



//    //bloquearInput("frmRecepción");
//    //document.getElementById("btnAgregar").style.display = "none";
//    //document.getElementById("btnModificar").style.display = "";
//    //DisplaybtnForm("btnSeguir", "");



//}

//function BloqueobtnForm(idBtn, bloqueo) {
//    const button = document.querySelector('#' + idBtn);
//    button.disabled = bloqueo;
//    if (bloqueo == true) {
//        document.getElementById(idBtn).style.display = "";
//    }
//}

function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


function Eliminar(id) {
    fetchGetText("Marca/EliminarMarca/?id=" + id, function (res) {
        if (res == "1") {
            listarMarca();
            Correcto("Se elimino Correctamente");

        }


    })
    //Confimacion("¿Desea eliminar el dato de marca?", "Confimar eliminación", function (res) {
    //    fetchGetText("Marca/EliminarMarca/?id=" + id, function (rpta) {
    //        if (rpta == "1") {
    //            Correcto("Se elimino correctamente");
    //            listarMarca();
    //        }

    //    })
    //})
}


