window.onload = function () {
    listar();

}

function listar() {
    var dia = document.getElementById("comboD").value

    pintar({
        url: "HorarioAtencion/ListarHorarioDia/?dia=" + dia,
        id: "divTabla",
        cabeceras: [/*"ID", *//**//*"Dia",*/"Hora Inicio", "Hora Fin"],
        colspan: 2,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",/* "Dia_Semanal",*/ "Hora_Inicio","Hora_Fin"],
        eliminar: true,
        editar: true,
        propiedadId: "ID_Horario"
    }, {
        busqueda: false,
        url: "Marca/filtrar",
        nombreparametro: "nombreMarca",
        id: "txtBusquedaMarca",
        idBusqueda: "seccionBuscar",
        placeholder: "Ingrese una Marca",
        type: "text"
    })
}


//function delay(time) {
//    return new Promise(resolve => setTimeout(resolve, time));
//}

//var respuestaRut;
//var respuestaMail;
//function GuardarDatos() {

//    var rut = document.getElementById("txtRut").value;
//    var mail = document.getElementById("txtmail").value;

//    var url = "Trabajador/VerificartrabajadorRut/?rut=" + rut;
//    var raiz = document.getElementById("hdfOculto").value;
//    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

//    fetch(urlAbsoluta)
//        .then(res => res.json())
//        .then(data => respuestaRut = data)

//    url = "Trabajador/VerificartrabajadorMail/?mail=" + mail;
//    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

//    fetch(urlAbsoluta)
//        .then(res => res.json())
//        .then(data => respuestaMail = data)



//    delay(1000).then(() => GuardarDatosValidado());


//}


//function GuardarDatosValidado() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    /*if (validarDatos() == 0) {*/
//        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listar();
//                Limpiar();
//                $('input').removeClass('is-valid');
//                Correcto("Se realizo exitosamente");
//            }
//        })
//   /* }*/
//}

//var respuestaModificar;
//function ModificarDatos() {
//    var rut = document.getElementById("txtRut").value;
//    var mail = document.getElementById("txtmail").value;

//    var url = "Trabajador/VerificartrabajadorRut/?rut=" + rut;
//    var raiz = document.getElementById("hdfOculto").value;
//    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

//    fetch(urlAbsoluta)
//        .then(res => res.json())
//        .then(data => respuestaRut = data)

//    url = "Trabajador/VerificartrabajadorMail/?mail=" + mail;
//    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

//    fetch(urlAbsoluta)
//        .then(res => res.json())
//        .then(data => respuestaMail = data)

//    var id = document.getElementById("txtTrabajador").value;
//    url = "Trabajador/RecuperarDatos/?id=" + id;
//    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

//    fetch(urlAbsoluta)
//        .then(res => res.json())
//        .then(data => respuestaModificar = data)



//    delay(1500).then(() => ModificarDatosValidado());

//}


//function ModificarDatosValidado() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatosM() == 0) {
//        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listar();
//                Limpiar();
//                $('input').removeClass('is-valid');
//                Correcto("Se realizo exitosamente");
//            }
//        })
//    }
//}

//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtnombre").value == "") {
//        document.getElementById("txtnombre").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtnombre").className = "form-control is-valid";
//    }
//    if (document.getElementById("txtdireccion").value == "") {
//        document.getElementById("txtdireccion").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtdireccion").className = "form-control is-valid";
//    }
//    if (document.getElementById("txtRut").value == "") {
//        document.getElementById("txtRut").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtRut").className = "form-control is-valid";
//    }
//    if (document.getElementById("txttelefono").value == "") {
//        document.getElementById("txttelefono").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txttelefono").className = "form-control is-valid";
//    }
//    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//    if (document.getElementById("txtmail").value == "") {
//        document.getElementById("txtmail").className = "form-control is-invalid";
//        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
//        val = 1;

//    } else {
//        if (!regexMail.test(document.getElementById("txtmail").value)) {
//            document.getElementById("txtmail").className = "form-control is-invalid";
//            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
//            val = 1;
//        } else {
//            if (respuestaMail.length != 0) {
//                val = 1;
//                document.getElementById("txtmail").className = "form-control is-invalid";
//                document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'

//            } else {

//                document.getElementById("txtmail").className = "form-control is-valid";
//            }
//        }

//    }

//    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

//    if (document.getElementById("txtRut").value == "") {
//        document.getElementById("txtRut").className = "form-control is-invalid";
//        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
//        val = 1;

//    } else {
//        if (!regexRut.test(document.getElementById("txtRut").value)) {
//            document.getElementById("txtRut").className = "form-control is-invalid";
//            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
//            val = 1;
//        } else {
//            if (respuestaRut.length != 0) {
//                val = 1;
//                document.getElementById("txtRut").className = "form-control is-invalid";
//                document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'

//            } else {

//                document.getElementById("txtRut").className = "form-control is-valid";
//            }
//        }
//    }
//    return val
//}

//function validarDatosM() {
//    var val = 0;

//    if (document.getElementById("txtnombre").value == "") {
//        document.getElementById("txtnombre").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtnombre").className = "form-control is-valid";
//    }
//    if (document.getElementById("txtdireccion").value == "") {
//        document.getElementById("txtdireccion").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtdireccion").className = "form-control is-valid";
//    }
//    if (document.getElementById("txtRut").value == "") {
//        document.getElementById("txtRut").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtRut").className = "form-control is-valid";
//    }
//    if (document.getElementById("txttelefono").value == "") {
//        document.getElementById("txttelefono").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txttelefono").className = "form-control is-valid";
//    }
//    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//    if (document.getElementById("txtmail").value == "") {
//        document.getElementById("txtmail").className = "form-control is-invalid";
//        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
//        val = 1;

//    } else {
//        if (!regexMail.test(document.getElementById("txtmail").value)) {
//            document.getElementById("txtmail").className = "form-control is-invalid";
//            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
//            val = 1;
//        } else {
//            if (respuestaMail.length != 0) {
//                //console.log(respuestaModificar.Mail_Cliente)
//                //console.log(respuestaMail[0].Mail_Cliente)
//                if (respuestaModificar.Mail_Trabajador == respuestaMail[0].Mail_Trabajador) {
//                    document.getElementById("txtmail").className = "form-control is-valid";
//                } else {
//                    val = 1;
//                    document.getElementById("txtmail").className = "form-control is-invalid";
//                    document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'
//                }


//            } else {

//                document.getElementById("txtmail").className = "form-control is-valid";
//            }
//        }

//    }

//    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

//    if (document.getElementById("txtRut").value == "") {
//        document.getElementById("txtRut").className = "form-control is-invalid";
//        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
//        val = 1;

//    } else {
//        if (!regexRut.test(document.getElementById("txtRut").value)) {
//            document.getElementById("txtRut").className = "form-control is-invalid";
//            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
//            val = 1;
//        } else {
//            if (respuestaRut.length != 0) {

//                if (respuestaModificar.Rut_Trabajador == respuestaRut[0].Rut_Trabajador) {
//                    document.getElementById("txtRut").className = "form-control is-valid";
//                } else {

//                    val = 1;
//                    document.getElementById("txtRut").className = "form-control is-invalid";
//                    document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'
//                }


//            } else {

//                document.getElementById("txtRut").className = "form-control is-valid";
//            }

//        }
//    }
//    return val
//}

function validarDatos() {
    var val = 0;

    if (document.getElementById("comboD").value == "") {
        document.getElementById("comboD").className = "form-select comboD is-invalid";
        document.getElementById("invalid-dia").innerHTML = 'Debe ingresar un horario de inicio'
        val = 1;

    } else {
        document.getElementById("comboD").className = "form-select comboD is-valid";
    }
    
    if (document.getElementById("txtInicio").value == "") {
        document.getElementById("txtInicio").className = "form-control is-invalid";
        document.getElementById("invalid-Inicio").innerHTML = 'Debe ingresar un horario de inicio'
        val = 1;

    } else {
        if (document.getElementById("txtFin").value == "") {
            document.getElementById("txtInicio").className = "form-control is-valid";
        } else {
            if (document.getElementById("txtInicio").value >= document.getElementById("txtFin").value) {
              document.getElementById("txtInicio").className = "form-control is-invalid";
              document.getElementById("invalid-Inicio").innerHTML = 'La hora es mayor o igual a la de fin'
            val = 1;
             } else {
              document.getElementById("txtInicio").className = "form-control is-valid";
        }
        }
        
        
    }

    if (document.getElementById("txtFin").value == "") {
        document.getElementById("txtFin").className = "form-control is-invalid";
        document.getElementById("invalid-Fin").innerHTML = 'Debe ingresar un horario de fin'
        val = 1;

    } else {
        if (document.getElementById("txtInicio").value == "") {
            document.getElementById("txtFin").className = "form-control is-invalid";
            document.getElementById("invalid-Fin").innerHTML = 'Ingrese primero una hora de inicio'
            val = 1;
        } else {
         if (document.getElementById("txtFin").value <= document.getElementById("txtInicio").value) {
                    document.getElementById("txtFin").className = "form-control is-invalid";
                    document.getElementById("invalid-Fin").innerHTML = 'La hora es menor o igual a la de inicio'
                    val = 1;
                } else {
                    document.getElementById("txtFin").className = "form-control is-valid";
                }
        }
       
    }

    return val
}

function GuardarDatos() {
    var formulario = document.getElementById("formulario");
    var frm = new FormData(formulario);

    if (validarDatos() == 0) {
        fetchPostText("HorarioAtencion/guardarDatos", frm, function (res) {
                if (res == "1") {
                        listar();
                        Limpiar();
                        $('input').removeClass('is-valid');
                        Correcto("Se realizo exitosamente");
                }
        })
    }

}

function ModificarDatos() {
    var formulario = document.getElementById("formulario");
    var frm = new FormData(formulario);

    if (validarDatos() == 0) {
        fetchPostText("HorarioAtencion/guardarDatos", frm, function (res) {
                    if (res == "1") {
                        listar();
                        Limpiar();
                        Correcto("Se realizo exitosamente");
                    }
        })

    }

}

function Limpiar() {

    LimpiarDatos("formulario", "ID_Horario", ["Dia_Semanal"]);
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal()
}
function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
    document.getElementById("comboD").className = "form-select comboD";
}

function Editar(id) {
    /*fetchget("/Marca/RecuperarDatos/?id=" + id, function (res) {
        setN("ID_Marca",res.ID_Marca);
        setN("Nombre_Marca",res.Nombre_Marca);
    })*/
    removeVal()
    recuperarGenerico("HorarioAtencion/RecuperarDatos/?id=" + id, "formulario");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}



function Eliminar(id) {
    fetchGetText("horarioAtencion/EliminarHorario/?id=" + id, function (res) {
        if (res == "1") {
            listar();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar, es utilizado en documentos")
        }


    })
}



function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}
