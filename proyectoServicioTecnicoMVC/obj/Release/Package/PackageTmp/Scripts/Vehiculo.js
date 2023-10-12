window.onload = function () {
    listarAuto();
    llenadoboxM();
    llenadoradioM(true, 0, true);
    llenadoboxTV();
    llenadoboxE();
    listarProductos()

}


function llenadoboxM() {
    url = "Marca/lista"
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;




    var comboBox = "<select id='comboMarca' name='ID_Marca'>";
    comboBox += "<option value='0'>Seleccione</option>";
    fetchget(url, function (res) {
   

        var fila;
        
        for (var i = 0; i < res.length; i++) {
            fila = res[i]

            comboBox += "<option value=" + fila["ID_Marca"] + ">" + fila["Nombre_Marca"] + "</option>";
            

        } comboBox += "</select>";

        document.getElementById("comboMarca").innerHTML = comboBox;

    })


}

function llenadoradioM(generar = true, idModel = 0, empty = false) {
    //el idm se coloca en html como base para poder captar un id 0
    var idM = 0;
    if (empty == false) {
        var idM = document.getElementById("comboMarca").value;
    } else {
        idM = 0;
    }

    url = "Modelo/listaModeloMarca/?id=" + idM;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    var radio = "";


    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]
            radio += "<div id='radiosM' class='radioSelect m-1'>";
            radio += "<label class='m-1'>" + fila["Nombre_Modelo"] + "</label>"
            if (generar == true) {
                if (i == 0) {
                    radio += "<input type='radio' id='txtradioM' class='m-1' name='ID_Modelo' value=" + fila["ID_Modelo"] + " checked><div></div>";
                } else {
                    radio += "<input type='radio' id='txtradioM'  class='m-1' name='ID_Modelo' value=" + fila["ID_Modelo"] + "><div></div>";
                }
            } else {

                if (fila["ID_Modelo"] == idModel) {
                    radio += "<input type='radio' id='txtradioM'  class='m-1' name='ID_Modelo' value=" + fila["ID_Modelo"] + " checked><div></div>";
                } else {
                    radio += "<input type='radio' id='txtradioM'  class='m-1' name='ID_Modelo' value=" + fila["ID_Modelo"] + "><div></div>";
                }

            }
            radio += "</div>";
        }

        document.getElementById("radio").innerHTML = radio;
    })

}

function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}

function recuperarAuto(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");

    var nombreName;
    var radioN = 0;

    fetchget(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            //Si esta incluido no se toma
            nombreName = elementos[i].name;

            if (!excepciones.includes(elementos[i].name)) {
                if (elementos[i].type.toUpperCase() == "RADIO") {
                    radioN = res[nombreName];



                }
                else {
                    if (nombreName == "Color") {
                        setColor(res[nombreName])
                    }
                    if (nombreName == "ID_Marca") {
                        setN(nombreName, res[nombreName])
                    }
                    else {
                        setN(nombreName, res[nombreName])
                    }
                }



            }

        }
        llenadoradioM(false, radioN);

    });


}

function llenadoboxE() {
    url = "Estado/lista"
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    var comboBox = "<select id='comboE' name='ID_Estado'>";

    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]
            comboBox += "<option value=" + fila["ID_Estado"] + ">" + fila["Nombre_Estado"] + "</option>";


        } comboBox += "</select>";

        document.getElementById("comboE").innerHTML = comboBox;
    })


}

function llenadoboxTV() {
    url = "TipoVehiculo/lista"
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;
    var comboBox = "<select id='comboTV' name='ID_TipoVehiculo'>";

    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]
            comboBox += "<option value=" + fila["ID_TipoVehiculo"] + ">" + fila["Producto"] + "</option>";


        } comboBox += "</select>";

        document.getElementById("comboTV").innerHTML = comboBox;
    })


}


function listarAuto() {
    var idCliente = document.getElementById("txtidCliente").value;

    pintar({

        url: "Vehiculo/listarVehiculoPorCliente/?idCliente=" + idCliente,
        id: "divTabla",
        cabeceras: [/*"ID",*/ "Patente", "Modelo", "Año", "Color", "Estado","Producto"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ "Patente", "Nombre_Modelo", "Ano_Vehiculo", "Color", "Nombre_Estado","Producto",],
        eliminar: true,
        editar: true,
        seleccionar: false,
        formulario: false,
        propiedadId: "ID_Vehiculo",
    }, {
        busqueda: false,

    })
}


function listarProductos() {

    pintar({

        url: "TipoVehiculo/lista",
        id: "divTablaP",
        cabeceras: [/*"ID",*/ "Producto"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ "Producto"],
        eliminar: false,
        editar: false,
        seleccionar: false,
        formulario: false,
        propiedadId: "ID_TipoVehiculo",
        EliminarModal: true,
        ModificarModal: true,
    }, {
        busqueda: false,

    })
}




function mostrarSubTabla(id) {
    let display = 'display-' + id;
    let icon = 'icon-' + id;

    let collapseModel = document.getElementById(display);

    let arrow = document.getElementById(icon);



    if (collapseModel.className == "showTable") {
        collapseModel.className = "hideTable";
        arrow.className = "bx bx-chevron-down"
    } else {
        let tablesDisable = document.querySelectorAll(".showTable");
        let arrowDisable = document.querySelectorAll(".bx.bx-chevron-up");

        for (var i = 0; i < tablesDisable.length; i++) {
            tablesDisable[i].className = "hideTable";
            arrowDisable[i].className = "bx bx-chevron-down";
        }
        collapseModel.className = "showTable";
        arrow.className = "bx bx-chevron-up";

    }

}




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var respuestaPatente;
function GuardarDatos() {

    var patente = document.getElementById("txtPatente").value;

    var url = "Vehiculo/verificarPatente/?patente=" + patente;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaPatente = data)


    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
       var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);


    if (validarDatos() == 0) {
        fetchPostText("Vehiculo/guardarDatos", frm, function (res) {
            if (res == "1") {
                listarAuto();
                Limpiar();
                removeVal()
                Correcto("Se realizo exitosamente");

            }
        })
    }
}

var respuestaModificar;
function ModificarDatos() {

    var patente = document.getElementById("txtPatente").value;

    var url = "Vehiculo/verificarPatente/?patente=" + patente;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaPatente = data)


    var id = document.getElementById("txtidVehiculo").value;
    url = "Vehiculo/RecuperarVehiculo/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)



    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);


    if (validarDatosM() == 0) {
        fetchPostText("Vehiculo/guardarDatos", frm, function (res) {
            if (res == "1") {
                listarAuto();
                Limpiar();
                removeVal()
                Correcto("Se realizo exitosamente");

            }
        })
    }
}

function validarDatos() {
    var val = 0;

    let regexPatenteL = new RegExp('^[a-z-A-Z]{4}[0-9]{2}$');
    let regexPatenteN = new RegExp('^[a-z-A-Z]{2}[0-9]{4}$');

    if (document.getElementById("txtPatente").value == "") {
        document.getElementById("txtPatente").className = "form-control is-invalid";
        document.getElementById("invalid-Patente").innerHTML = 'Debe ingresar una patente'
        val = 1;

    } else {
        if (!regexPatenteL.test(document.getElementById("txtPatente").value) && !regexPatenteN.test(document.getElementById("txtPatente").value)) {
            document.getElementById("txtPatente").className = "form-control is-invalid";
            document.getElementById("invalid-Patente").innerHTML = 'Considere 4 digitos numericos y dos letras o dos letras y cuatro numeros'
            val = 1;
        } else {
            if (respuestaPatente.length != 0) {
                val = 1;
                document.getElementById("txtPatente").className = "form-control is-invalid";
                document.getElementById("invalid-Patente").innerHTML = 'La patente que intenta ingresar ya existe'

            } else {

                document.getElementById("txtPatente").className = "form-control is-valid";
            }
        }
    }

    if (document.getElementById("setColor").value == "") {
        document.getElementById("setColor").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("setColor").className = "form-control is-valid";
    }

    let regexAño = new RegExp('[0-9]{4}');

    if (document.getElementById("txtano").value == "") {
        document.getElementById("txtano").className = "form-control is-invalid";
        document.getElementById("invalid-año").innerHTML = 'Debe ingresar un año'
        $('#alert').hide();
        val = 1;

    } else {
        if (!regexAño.test(document.getElementById("txtano").value)) {
            document.getElementById("txtano").className = "form-control is-invalid";
            document.getElementById("invalid-año").innerHTML = 'Ingrese un año de 4 digitos'
        } else {
            if (document.getElementById("txtano").value < 1990) {
                $('#alert').show();
                document.getElementById("txtano").className = "form-control is-valid";
            } else {
                document.getElementById("txtano").className = "form-control is-valid";
                $('#alert').hide();
            }

        }


    }

    return val
}

function validarDatosM() {
    var val = 0;

    let regexPatenteL = new RegExp('^[a-z-A-Z]{4}[0-9]{2}$');
    let regexPatenteN = new RegExp('^[a-z-A-Z]{2}[0-9]{4}$');

    if (document.getElementById("txtPatente").value == "") {
        document.getElementById("txtPatente").className = "form-control is-invalid";
        document.getElementById("invalid-Patente").innerHTML = 'Debe ingresar una patente'
        val = 1;

    } else {
        if (!regexPatenteL.test(document.getElementById("txtPatente").value) && !regexPatenteN.test(document.getElementById("txtPatente").value)) {
            document.getElementById("txtPatente").className = "form-control is-invalid";
            document.getElementById("invalid-Patente").innerHTML = 'Considere 4 digitos numericos y dos letras o dos letras y cuatro numeros'
            val = 1;
        } else {
            if (respuestaPatente.length != 0) {
                console.log(respuestaModificar.Patente)
                console.log(respuestaPatente[0].Patente)
                if (respuestaModificar.Patente == respuestaPatente[0].Patente) {
                    document.getElementById("txtPatente").className = "form-control is-valid";
                } else {
                    val = 1;
                    document.getElementById("txtPatente").className = "form-control is-invalid";
                    document.getElementById("invalid-Patente").innerHTML = 'La patente que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtPatente").className = "form-control is-valid";
            }
        }
    }

    if (document.getElementById("setColor").value == "") {
        document.getElementById("setColor").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("setColor").className = "form-control is-valid";
    }

    let regexAño = new RegExp('[0-9]{4}');

    if (document.getElementById("txtano").value == "") {
        document.getElementById("txtano").className = "form-control is-invalid";
        document.getElementById("invalid-año").innerHTML = 'Debe ingresar un año'
        $('#alert').hide();
        val = 1;

    } else {
        if (!regexAño.test(document.getElementById("txtano").value)) {
            document.getElementById("txtano").className = "form-control is-invalid";
            document.getElementById("invalid-año").innerHTML = 'Ingrese un año de 4 digitos'
        } else {
            if (document.getElementById("txtano").value < 1990) {
                $('#alert').show();
                document.getElementById("txtano").className = "form-control is-valid";
            } else {
                document.getElementById("txtano").className = "form-control is-valid";
                $('#alert').hide();
            }

        }


    }

    return val
}







//function validarDatos() {
//    var val = 0;

//    let regexPatenteL = new RegExp('^[a-z-A-Z]{4}[0-9]{2}$');
//    let regexPatenteN = new RegExp('^[a-z-A-Z]{2}[0-9]{4}$');

//    if (document.getElementById("txtPatente").value == "") {
//        document.getElementById("txtPatente").className = "form-control is-invalid";
//        document.getElementById("invalid-Patente").innerHTML = 'Debe ingresar una patente'
//        val = 1;

//    } else {
//        if (!regexPatenteL.test(document.getElementById("txtPatente").value) && !regexPatenteN.test(document.getElementById("txtPatente").value)) {
//            document.getElementById("txtPatente").className = "form-control is-invalid";
//            document.getElementById("invalid-Patente").innerHTML = 'Considere 4 digitos numericos y dos letras o dos letras y cuatro numeros'
//            val = 1;
//        } else {
//            document.getElementById("txtPatente").className = "form-control is-valid";
//        }
//    }

//    if (document.getElementById("setColor").value == "") {
//        document.getElementById("setColor").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("setColor").className = "form-control is-valid";
//    }

//    let regexAño = new RegExp('[0-9]{4}');

//    if (document.getElementById("txtano").value == "") {
//        document.getElementById("txtano").className = "form-control is-invalid";
//        document.getElementById("invalid-año").innerHTML = 'Debe ingresar un año'
//        $('#alert').hide();
//        val = 1;

//    } else {
//        if (!regexAño.test(document.getElementById("txtano").value)) {
//            document.getElementById("txtano").className = "form-control is-invalid";
//            document.getElementById("invalid-año").innerHTML = 'Ingrese un año de 4 digitos'
//        } else {
//            if (document.getElementById("txtano").value < 1990) {
//                $('#alert').show();
//                document.getElementById("txtano").className = "form-control is-valid";
//            } else {
//                document.getElementById("txtano").className = "form-control is-valid";
//                $('#alert').hide();
//            }
              
//        }


//    }

//    return val
//}

//function GuardarDatos() {
//    var frmR = document.getElementById("frmRecepción");
//    var frm = new FormData(frmR);


//    if (validarDatos() == 0) {
//        fetchPostText("Vehiculo/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listarAuto();
//                Limpiar();
//                removeVal()
//                Correcto("Se realizo exitosamente");

//            }
//        })
//    }
//}


//function ModificarDatos() {
//    var frmR = document.getElementById("frmRecepción");
//    var frm = new FormData(frmR);
//    if (validarDatos() == 0) {
//        fetchPostText("Vehiculo/guardarDatos", frm, function (res) {

//            if (res == "1") {
//                listarAuto();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//                removeVal()
//            }

//        })
//    }
//}



//function GuardarDatosP() {
//    var frmP = document.getElementById("frmProducto");
//    var frm = new FormData(frmP);
 


//   /* if (validarDatos() == 0) {*/
//        fetchPostText("TipoVehiculo/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listarProductos();
//                Limpiar();
//                removeVal()
//                Correcto("Se realizo exitosamente");

//            }
//        })
//   /* }*/
//}

function Limpiar() {
   
    LimpiarDatos("frmRecepción", "ID_Vehiculo", ["ID_Marca", "ID_TipoVehiculo", "ID_Cliente", "ID_Estado", "ID_Modelo"]);
    llenadoboxM();
    llenadoboxTV();
    llenadoboxE();
    llenadoradioM(true, 0, true)
    $('#alert').hide();
    $(selector).removeClass('active');
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal()


}

function Editar(id) {


    /*recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", ["Color"]);*/
    recuperarAuto("Vehiculo/RecuperarVehiculo/?id=" + id, "frmRecepción", ["ID_Cliente"])
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}

function ModificarModal(id) {


    /*recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", ["Color"]);*/
    recuperarGenerico("TipoVehiculo/RecuperarDatos/?id=" + id, "frmProducto", ["ID_TipoVehiculo"])
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}

function Select(id) {
    var url = "Vehiculo/DatosSession/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Vehiculo == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("Presupuesto/FrmPFormulario");
        }
    })
}

function SelectB(id) {
    var url = "Vehiculo/DatosSession/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Vehiculo == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("Presupuesto/FrmPFormulario");
        }
    })


}

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
    fetchGetText("Vehiculo/EliminarVehiculo/?id=" + id, function (res) {
        if (res == "1") {
            listarAuto();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar auto asociado a documentos");
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

function EliminarModal(id) {
    fetchGetText("TipoVehiculo/EliminarTipoVehiculo/?id=" + id, function (res) {
        if (res == "1") {
            listarProductos();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar Tipo de Vehiculo asociado a documentos");
        }


    })
}




