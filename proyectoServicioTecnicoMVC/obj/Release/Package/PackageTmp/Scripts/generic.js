function get(id) {
    return document.getElementById(id).value;
}

function set(id, valor) {
    document.getElementById(id).value = valor;
}

function setN(id, valor) {
    document.getElementsByName(id)[0].value = valor;
}
function setCheck(id, condicion) {
    if (condicion == 0) {
        document.getElementsByName(id)[0].checked = true;
    } else {
        document.getElementsByName(id)[0].checked = false;
    }
   
}

function getN(id){
    return document.getElementsByName(id)[0].value;
}


function setC(selector,check = true) {
    document.querySelector(selector).checked = check;
}

function setD(id,valor) {
    document.getElementById(id).style.display = valor;
}

function Error(texto ="Ocurrio un error") {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
    })
}

function Correcto(texto="Se realizo correctamente") {
    Swal.fire({
        icon: 'success',
        title: texto,
        showConfirmButton: false,
        timer: 1500
    })
}


var objConfiguracionGlobal;
var objBusquedaGLobal;
var idSub;

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
            if (objConfiguracion.SelectName == undefined) {
                objConfiguracion.SelectName = "Seleccionar";
            }
            if (objConfiguracion.formulario == undefined) {
                objConfiguracion.formulario = false;
            }
            if (objConfiguracion.formularioB == undefined) {
                objConfiguracion.formularioB = false;
            }
            if (objConfiguracion.formularioE == undefined) {
                objConfiguracion.formularioE = false;
            }
            if (objConfiguracion.verDocumento == undefined) {
                objConfiguracion.verDocumento = false;
            }
            if (objConfiguracion.EliminarModal == undefined) {
                objConfiguracion.EliminarModal = false;
            }
            if (objConfiguracion.ModificarModal == undefined) {
                objConfiguracion.ModificarModal = false;
            }
            if (objConfiguracion.check == undefined) {
                objConfiguracion.check == false
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
                if (objBusqueda.cantB == undefined) {
                    objBusqueda.cantB == false;
                }
                if (objBusqueda.maxlength == undefined) {
                    objBusqueda.maxlength == 50;
                }
                if (objBusqueda.funcion == undefined) {
                    objBusqueda.funcion = "onkeyup"
                }
                if (objBusqueda.txtBuscar == undefined) {
                    objBusqueda.txtBuscar = "Buscar"
                }
                if (objBusqueda.EliminarS == undefined) {
                    objBusqueda.EliminarS = false
                }
                
                
                //asignar valores
                objConfiguracionGlobal = objConfiguracion;
                objBusquedaGLobal = objBusqueda;

                contenido += `<div class="seccionBusqueda">`;
                contenido +=`
                    <p class=textBusqueda>${objBusqueda.txtBuscar}</p>
                    <div class="search">
                        <i id="search-icon" class='bx bx-search-alt'></i>
                        <input id="${objBusqueda.id}" placeholder="${objBusqueda.placeholder}" maxlength="${objBusqueda.maxlength}" ${objBusqueda.funcion}="buscar()" class="casillaB" type="${objBusqueda.type}">
                    </div>`

               
                if (objBusqueda.EliminarS == true) {
                    contenido += `
                    <p  class=textBusqueda>Limpiar expiradas</p>
                    <button style=" margin:0px; padding:0px; padding-bottom:2px; border:none; background-color:#F5F5F5"  type="button" id="btnLimpiar"  onclick="EliminarExp()"><i style=" margin-left:5px;" class="fa-solid fa-trash-can"></i></i></button>
                    `
                }

                contenido +=`</div>`
                
                
         
            }
            contenido += "<div id='divContenedor' class='divContenedor'>";
            contenido += generarTabla(objConfiguracion,res)
            contenido += "</div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;


        })
}

function generarTabla(objConfiguracion,res) {
    var contenido = "";
    contenido += "<div class='scroll-window-wrapper'>";
    contenido += "<div class='scroll-window'>";
    contenido += "<table class='table table-striped table-hover user-list fixed-header'>";
    contenido += "<thead>";
    for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
        contenido += "<th><div>" + objConfiguracion.cabeceras[j] + "</div></th>";
    }
    if (objConfiguracion.check == true || objConfiguracion.formularioE == true || objConfiguracion.subtabla == true || objConfiguracion.editar == true || objConfiguracion.eliminar == true || objConfiguracion.seleccionar == true || objConfiguracion.auto == true || objConfiguracion.subtabla == true || objConfiguracion.usuario == true) {
        contenido += `<th><div></div></th>`
    }
  
    contenido += "<tbody>";
    var fila;
    var propiedadActual;
    for (var i = 0; i < res.length; i++) {
        fila = res[i]
        contenido += `<tr colspan='` + objConfiguracion.colspan + `'>`;
        for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
            propiedadActual = objConfiguracion.propiedades[j]
            switch (propiedadActual) {
                case "Valor":
                    contenido += "<td>$" + fila[propiedadActual] + "</td>";
                    break;
                case "Estado":
                    if (fila[propiedadActual] != 0) {
                        contenido += "<td>Vigente</td>";
                    } else {
                        contenido += "<td>Cancelada</td>";
                    }
                    
                    break;
                default:
                    contenido += "<td>" + fila[propiedadActual] + "</td>";
                    break;
            }


            //if (propiedadActual == "Valor") {
            //    contenido += "<td>$" + fila[propiedadActual] + "</td>";
            //} else {
            //    if (propiedadActual == "Vigente") {

            //    } else {
            //        contenido += "<td>" + fila[propiedadActual] + "</td>";
            //    }
                
            //}
           
 
        }
        if (objConfiguracion.check == true || objConfiguracion.check == true || objConfiguracion.ModificarModal==true || objConfiguracion.auto == true || objConfiguracion.subtabla == true || objConfiguracion.usuario == true || objConfiguracion.eliminar == true || objConfiguracion.editar == true || objConfiguracion.seleccionar == true || objConfiguracion.formularioE == true) {
            contenido += "<td>";
            if (objConfiguracion.editar == true) {
                if (objConfiguracion.popup == true) {
                    contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar' data-toggle="modal" data-target="#${objConfiguracion.idPopup}"><i class="fa-solid fa-pen-to-square"></i></button>`;
                } else {
                    contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar'><i class="fa-solid fa-pen-to-square"></i></button>`;
                }
                
            }
            
            if (objConfiguracion.eliminar == true) {
                contenido += `<Button type="button" onclick='Eliminar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Eliminar'><i class="fa-solid fa-trash-can"></i></button>`;
            }
            if (objConfiguracion.subtabla == true) {
                contenido += `<button type="button" class='btn btn-info' onclick='mostrarSubTabla(${i})'><i id='icon-` + i + `' class='bx bx-chevron-down'></i>`;
            }
            if (objConfiguracion.seleccionar == true) {
                contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver más'> ${objConfiguracion.SelectName}</button>`;
            }

            if (objConfiguracion.usuario == true) {
                contenido += `<Button type="button" onclick='EditarUsu(${fila[objConfiguracion.propiedadId]})' class='btn btn-info'  title='Agregar Usuario' data-toggle="modal" data-target="#${objConfiguracion.idPopup}"><i style="font-size:22px;" class='bx bxs-user-plus' ></i></button>`;
            }
            if (objConfiguracion.auto == true) {
                contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver autos' ><i class='bx bxs-car-mechanic'></i></button>`;
            }
            if (objConfiguracion.formulario == true) {

             /*   contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Agregar documento'><i class='bx bx-file' ></i></button>`;*/
                contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Agregar documento'><i class="fa-solid fa-file-circle-plus"></i></button>`;

            }
            if (objConfiguracion.formularioB == true) {
                contenido += `<Button type="button" onclick='SelectB(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documentos'><i style="font-size:20px; margin-top:2px;" class='bx bxs-file-find'></i></button>`;
      /*          contenido += `<Button type="button" onclick='SelectB(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documentos'><i class='bx bx-file-find' ></i></button>`;*/
            }
            if (objConfiguracion.formularioE == true) {
                contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Editar documento'><i style="font-size:16px; margin-top:2px;" class='fa-solid fa-file-pen'></i></button>`;
   
            }
            if (objConfiguracion.verDocumento == true) {
                contenido += `<Button type="button" onclick='Ver(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documento'><i style="font-size:16px; margin-top:2px;" class='fa-regular fa-eye'></i></button>`;

            }
            if (objConfiguracion.EliminarModal == true) {
                contenido += `<Button type="button" onclick='EliminarModal(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Eliminar'><i class="fa-solid fa-trash-can"></i></button>`;

            }
            if (objConfiguracion.ModificarModal == true) {
                contenido += `<Button type="button" onclick='ModificarModal(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar'><i class="fa-solid fa-pen-to-square"></i></button>`;
            }
            if (objConfiguracion.check == true) {
                contenido += `<Button type="button" onclick='seleccionar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Seleccionar'><i class="fa-solid fa-check"></i></button>`;
            }

          
            contenido += "</td>";
            contenido += "</tr>";




                contenido += "</td>";
                contenido += "</tr>";
                contenido += "<tr id='display-" + i + "' class='hideTable'>";
                contenido += `<td colspan='` + objConfiguracion.colspanSub + `'>`;
                contenido += "<div>";
                contenido += "<table class='subTable'>";
                contenido += "<th>ID</th>";
                contenido += "<th>Modelo</th>";
                contenido += "<tr>";
                contenido += "<td>1</td>";
                contenido += "<td>Camaro</td>";
                contenido += "</tr>";
                contenido += "<tr>";
                contenido += "<td>2</td>";
                contenido += "<td>Aveo</td>";
                contenido += "</tr>";
                contenido += "</table>";
                contenido += "</div>";
                contenido += "</td>";
                contenido += "</tr>";

                //contenido += "<tr id='display-" + i + "' class='hideTable'>";
               
                //        contenido += `<td colspan='` + objConfiguracion.colspanSub + `'>`;
                //        contenido += "<div>";
                //        contenido += "<table class='subTable'>";
                    
                //        for (var j = 0; j < objConfiguracion.cabecerasS.length; j++) {
                //            contenido += "<th>" + objConfiguracion.cabecerasS[j] + "</th>";
                //          }

                //contenido += `<tr id='SubContenido-` + i + `'></tr>`;
                //idSub = i;
                //fetchGetJson(objConfiguracion.urlS + fila[objConfiguracion.propiedadId], function (resub) {
                //    var filaS;
                //    var propiedadActualS
                //    var contenidoS = ""
                //    for (var x = 0; x < resub.length; x++) {
                //        filaS = resub[x]

                //        contenidoS += "<tr>";
                //        for (var h = 0; h < objConfiguracion.propiedadesS.length; h++) {

                //            propiedadActualS = objConfiguracion.propiedadesS[h]
                //            console.log(filaS[propiedadActualS])
                //            contenidoS += "<td>" + filaS[propiedadActualS] + "</td>";


                //        }
                //        contenidoS += "</tr>";

                //    }

                //    document.getElementById("SubContenido-" + 0).innerHTML = contenidoS

                //})
               
     
 
             
            
            

        } else {
            /* contenido += "</tr>";*/
            contenido += "</tr>";

            contenido += "</td>";
            contenido += "</tr>";
            contenido += "<tr id='display-" + i + "' class='hideTable'>";

        }
           
    }
    contenido += "</tbody>";
    contenido += "</table>";
    contenido += "</div>";
    contenido += "</div>";
    return contenido;
}


function setUrl(url) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    return urlAbsoluta;
}

function fetchget(url,callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    setD("cargando", "block");
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            setD("cargando", "none");
            callback(res)
        }).catch(err => {
            console.log(err);
            setD("cargando", "none");
        })
}

function fetchGetText(url, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    setD("cargando", "block");
    fetch(urlAbsoluta).then(res => res.text())
        .then(res => {
            callback(res)
            setD("cargando", "none");
        }).catch(err => {
            console.log(err);
            setD("cargando", "none");
        })
}

function fetchGetJson(url,callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    setD("cargando", "block");
    fetch(urlAbsoluta).then(res => res.json())
        .then(res => {
            callback(res)
            setD("cargando", "none");
        }).catch(err => {
            console.log(err);
            setD("cargando", "none");
        })
}


function fetchPostText(url,frm, callback) {
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    setD("cargando", "block");
    fetch(urlAbsoluta, {
        method: "POST",
        body: frm
    }).then(res => res.text())
        .then(res => {
            callback(res)
            setD("cargando", "none");
        }).catch(err => {
            console.log(err);
            setD("cargando", "none");
        })
}


function buscar() {
    var objConf = objConfiguracionGlobal;
    var objBus = objBusquedaGLobal;
    //id del control
    var valor = get(objBus.id);
   
   
    if (objBus.cantB == true) {
        var valorD = get(objBus.idD);
        fetchget(`${objBus.url}/?${objBus.nombreparametro}=` + valorD + `&${objBus.nombreparametroD}=` + valor, function (res) {
            var rpta = generarTabla(objConf, res);
            document.getElementById("divContenedor").innerHTML = rpta;
        })
    } else {
      fetchget(`${objBus.url}/?${objBus.nombreparametro}=` + valor, function (res) {
            var rpta = generarTabla(objConf, res);
            document.getElementById("divContenedor").innerHTML = rpta;
        })
    }
  
}

function LimpiarDatos(idFormulario,id, excepciones=[]) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido no se toma
        if (!excepciones.includes(elementos[i].name)) {
            if (elementos[i].name == id) {
                if (elementos[i].value != 0) {
                    setN(id, 0)
                }
            } else {
                elementos[i].value = "";
            }
            
        }

               
    }

}

function recuperarGenerico(url,idFormulario, excepciones = []){
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    var nombreName;

    fetchget(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            //Si esta incluido no se toma
            nombreName = elementos[i].name;
            if (!excepciones.includes(elementos[i].name)) {
                setN(nombreName, res[nombreName])
            }

        }
    });
}


function bloquearInput(idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido no se toma
        if (!excepciones.includes(elementos[i].name)) {
            var id = "#" + elementos[i].getAttribute('id');
            $(id).prop('readonly', true);
        }
    }
}

function DesbloquearInput(idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    for (var i = 0; i < elementos.length; i++) {
        //Si esta incluido no se toma
        if (!excepciones.includes(elementos[i].name)) {
            var id = "#" + elementos[i].getAttribute('id');
            $(id).prop('readonly', false);
        }
    }
}