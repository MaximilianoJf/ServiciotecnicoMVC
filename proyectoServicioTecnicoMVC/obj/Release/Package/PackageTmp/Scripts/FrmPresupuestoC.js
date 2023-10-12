window.onload = function () {
    listarCliente();

}



function listarCliente() {
    pintar({
        //popup: true,
        //idPopup: "exampleModal",
        url: "Cliente/lista",
        id: "divTabla",
        cabeceras: [/*"ID",*/ "RUT", "Nombre", "Dirección", "Fono", "Mail"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Cliente",*/ "Rut_Cliente", "Nombre_Cliente", "Direccion_Cliente", "Fono_Cliente", "Mail_Cliente"],
        eliminar: false,
        editar: true,
        seleccionar: false,
        auto: true,
        propiedadId: "ID_Cliente"
    }, {
        busqueda: true,
        url: "Cliente/filtrar",
        nombreparametro: "rut",
        id: "txtBusquedaCliente",
        idBusqueda: "seccionBuscar",
        placeholder: "Ingrese un RUT",
        type: "text"
    })
}

//function buscar() {

//    const idBusqueda = "txtnombreMarca";
//    var nombreMarca = get(idBusqueda);

//    pintar({
//        url: "Marca/filtrar/?nombreMarca=" + nombreMarca,
//        id: "divTabla",
//        cabeceras: ["ID", "Nombre"],
//        colspan: 3,
//        subtabla: true,
//        colspanSub: 3,
//        propiedades: ["ID_Marca", "Nombre_Marca"]
//    });


//}


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
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var respuestaRut;
var respuestaMail;
function GuardarDatos() {

    var rut = document.getElementById("txtRutCliente").value;
    var mail = document.getElementById("txtmailCliente").value;

    var url = "Cliente/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)

    url = "Cliente/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)



    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);

    /*  console.log(respuestaRut)*/
    //if (typeof respuestaRut !== "undefined") {
    //    respValidado = 1;
    //} else {
    //    respValidado = 0;
    //}

    if (validarDatos() == 0) {
        fetchPostText("Cliente/GuardarDatos", frm, function (res) {

            if (res == "1") {
                listarCliente();
                Limpiar();
                Correcto("Se realizo exitosamente");
                removeVal();
            } else {
                Error("Revise todos los datos que intenta ingresar")
            }
        })
    }
}

var respuestaModificar;
function ModificarDatos() {
    var rut = document.getElementById("txtRutCliente").value;
    var mail = document.getElementById("txtmailCliente").value;

    var url = "Cliente/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)


    var id = document.getElementById("txtidCliente").value;
    url = "Cliente/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)


    url = "Cliente/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)


    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);
    //console.log(respuestaModificar.Rut_Cliente)
    //console.log(respuestaRut[0].Rut_Cliente)

    if (validarDatosM() == 0) {
        fetchPostText("Cliente/GuardarDatos", frm, function (res) {

            if (res == "1") {
                listarCliente();
                Limpiar();
                Correcto("Se realizo exitosamente");
                removeVal();
            } else {
                Error("Revise todos los datos que intenta ingresar")
                DisplaybtnForm("btnAgregar", "none");
                DisplaybtnForm("btnModificar", "");
            }
        })
    }
}

function validarDatos() {
    var val = 0;
    //console.log(respuestaMail)
    //console.log(respuestaRut)

    if (document.getElementById("txtnombreCliente").value == "") {
        document.getElementById("txtnombreCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombreCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txtdireccionCliente").value == "") {
        document.getElementById("txtdireccionCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccionCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txttelefonoCliente").value == "") {
        document.getElementById("txttelefonoCliente").className = "form-control is-invalid";
        val = 1;

    } else {

        document.getElementById("txttelefonoCliente").className = "form-control is-valid";
    }

    /*   let regexMail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');*/
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (document.getElementById("txtmailCliente").value == "") {
        document.getElementById("txtmailCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmailCliente").value)) {
            document.getElementById("txtmailCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                val = 1;
                document.getElementById("txtmailCliente").className = "form-control is-invalid";
                document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'

            } else {

                document.getElementById("txtmailCliente").className = "form-control is-valid";
            }
        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRutCliente").value == "") {
        document.getElementById("txtRutCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRutCliente").value)) {
            document.getElementById("txtRutCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {
            if (respuestaRut.length != 0) {
                val = 1;
                document.getElementById("txtRutCliente").className = "form-control is-invalid";
                document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'

            } else {

                document.getElementById("txtRutCliente").className = "form-control is-valid";
            }

        }
    }

    return val
}

function validarDatosM() {
    var val = 0;

    if (document.getElementById("txtnombreCliente").value == "") {
        document.getElementById("txtnombreCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombreCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txtdireccionCliente").value == "") {
        document.getElementById("txtdireccionCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccionCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txttelefonoCliente").value == "") {
        document.getElementById("txttelefonoCliente").className = "form-control is-invalid";
        val = 1;

    } else {

        document.getElementById("txttelefonoCliente").className = "form-control is-valid";
    }

    /*   let regexMail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');*/
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (document.getElementById("txtmailCliente").value == "") {
        document.getElementById("txtmailCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmailCliente").value)) {
            document.getElementById("txtmailCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                //console.log(respuestaModificar.Mail_Cliente)
                //console.log(respuestaMail[0].Mail_Cliente)
                if (respuestaModificar.Mail_Cliente == respuestaMail[0].Mail_Cliente) {
                    document.getElementById("txtmailCliente").className = "form-control is-valid";
                } else {
                    val = 1;
                    document.getElementById("txtmailCliente").className = "form-control is-invalid";
                    document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtmailCliente").className = "form-control is-valid";
            }

        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRutCliente").value == "") {
        document.getElementById("txtRutCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRutCliente").value)) {
            document.getElementById("txtRutCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {

            if (respuestaRut.length != 0) {

                if (respuestaModificar.Rut_Cliente == respuestaRut[0].Rut_Cliente) {
                    document.getElementById("txtRutCliente").className = "form-control is-valid";
                } else {

                    val = 1;
                    document.getElementById("txtRutCliente").className = "form-control is-invalid";
                    document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtRutCliente").className = "form-control is-valid";
            }




        }
    }

    return val
}




//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtnombreCliente").value == "") {
//        document.getElementById("txtnombreCliente").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtnombreCliente").className = "form-control is-valid";
//    }

//    if (document.getElementById("txtdireccionCliente").value == "") {
//        document.getElementById("txtdireccionCliente").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtdireccionCliente").className = "form-control is-valid";
//    }

//    if (document.getElementById("txttelefonoCliente").value == "") {
//        document.getElementById("txttelefonoCliente").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txttelefonoCliente").className = "form-control is-valid";
//    }

//    let regexMail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

//    if (document.getElementById("txtmailCliente").value == "") {
//        document.getElementById("txtmailCliente").className = "form-control is-invalid";
//        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
//        val = 1;

//    } else {
//        if (!regexMail.test(document.getElementById("txtmailCliente").value)) {
//            document.getElementById("txtmailCliente").className = "form-control is-invalid";
//            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
//            val = 1;
//        } else {
//            document.getElementById("txtmailCliente").className = "form-control is-valid";
//        }

//    }

//    let regexRut = new RegExp('^[0-9]+-[0-9kK]{1}$');

//    if (document.getElementById("txtRutCliente").value == "") {
//        document.getElementById("txtRutCliente").className = "form-control is-invalid";
//        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
//        val = 1;

//    } else {
//        if (!regexRut.test(document.getElementById("txtRutCliente").value)) {
//            document.getElementById("txtRutCliente").className = "form-control is-invalid";
//            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
//            val = 1;
//        } else {
//            document.getElementById("txtRutCliente").className = "form-control is-valid";
//        }
//    }

//    return val
//}

//function GuardarDatos() {
//    var frmR = document.getElementById("frmRecepción");
//    var frm = new FormData(frmR);


//    //if (btnM == "") {
//    //    document.getElementById("btnAgregar").style.display = "";
//    //    document.getElementById("btnModificar").style.display = "none";
//    //} else {
//    //    document.getElementById("btnAgregar").style.display = "none";
//    //    document.getElementById("btnModificar").style.display = "";
//    //}
//    if (validarDatos() == 0) {
//        fetchPostText("Cliente/GuardarDatos", frm, function (res) {

//            if (res == "1") {
//                listarCliente();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//                removeVal();
//            } else {
//                Error("Revise todos los datos que intenta ingresar")
//            }
//        })
//    }
//}


//function ModificarDatos() {
//    var frmR = document.getElementById("frmRecepción");
//    var frm = new FormData(frmR);
//    if (validarDatos() == 0) {
//        fetchPostText("Cliente/GuardarDatos", frm, function (res) {
//            console.log(res);
//            if (res == "1") {
//                listarCliente();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//                removeVal();
//            } else {

//                Error("Revise todos los datos que intenta ingresar")
//                DisplaybtnForm("btnAgregar", "none");
//                DisplaybtnForm("btnModificar", "");
//            }
//        })
//    }
//}

function Limpiar() {
    /*setN("Nombre_Marca", "");*/

    //var elementos = document.querySelectorAll("#frmMarca [name]");
    //for (var i = 0; i < elementos.length; i++) {
    //    elementos[i].value = "";
    //}


    /*Bloquear datos*/
    //LimpiarDatos("frmRecepción", "ID_Marca", "Trabajador");
    //$("#btnlimpiar").click(function () {
    //    $("#txtnombreMarca").prop('readonly', true);
    //});
    LimpiarDatos("frmRecepción", "ID_Cliente", ["ID_Automotriz"]);
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal();
    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}

function Editar(id) {


    recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", /*["FECHA_RECEPCION", "Trabajador"]*/);
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}

function Select(id) {
    var url = "Cliente/DatosSession/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Cliente == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            console.log(url);
            document.location.href = setUrl("Presupuesto/FrmPAuto");
        }
    })

    /*recuperarGenerico("Cliente/DatosSession/?id=" + id, "frmRecepción" *//*,["ID_AUTOMOTRIZ", "MAIL_CLIENTE", "USUARIO_CLIENTE","CLAVE_CLIENTE"]*//*);*/



    //bloquearInput("frmRecepción");
    //document.getElementById("btnAgregar").style.display = "none";
    //document.getElementById("btnModificar").style.display = "";
    //DisplaybtnForm("btnSeguir", "");



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
