window.onload = function () {
    listar();

}

function listar() {
    pintar({
        url: "Trabajador/lista",
        id: "divTabla",
        cabeceras: [/*"ID", */"Rut","Nombre","Direccion","Telefono","Mail"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",*/"Rut_Trabajador","Nombre_Trabajador", "Direccion_Trabajador", "Telefono_Trabajador", "Mail_Trabajador"],
        eliminar: true,
        editar: true,
        propiedadId: "ID_Trabajador"
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


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var respuestaRut;
var respuestaMail;
function GuardarDatos() {

    var rut = document.getElementById("txtRut").value;
    var mail = document.getElementById("txtmail").value;

    var url = "Trabajador/VerificartrabajadorRut/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)

    url = "Trabajador/VerificartrabajadorMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)



    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var formulario = document.getElementById("formulario");
    var frm = new FormData(formulario);

    if (validarDatos() == 0) {
        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
                    if (res == "1") {
                        listar();
                        Limpiar();
                        $('input').removeClass('is-valid');
                        Correcto("Se realizo exitosamente");
        }
      })
    }
}

var respuestaModificar;
function ModificarDatos() {
    var rut = document.getElementById("txtRut").value;
    var mail = document.getElementById("txtmail").value;

    var url = "Trabajador/VerificartrabajadorRut/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)

    url = "Trabajador/VerificartrabajadorMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)

    var id = document.getElementById("txtTrabajador").value;
    url = "Trabajador/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)



    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var formulario = document.getElementById("formulario");
    var frm = new FormData(formulario);

    if (validarDatosM() == 0) {
        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
                    if (res == "1") {
                        listar();
                        Limpiar();
                        $('input').removeClass('is-valid');
                        Correcto("Se realizo exitosamente");
        }
      })
    }
}

function validarDatos() {
    var val = 0;

    if (document.getElementById("txtnombre").value == "") {
        document.getElementById("txtnombre").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombre").className = "form-control is-valid";
    }
    if (document.getElementById("txtdireccion").value == "") {
        document.getElementById("txtdireccion").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccion").className = "form-control is-valid";
    }
    if (document.getElementById("txtRut").value == "") {
        document.getElementById("txtRut").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtRut").className = "form-control is-valid";
    }
    if (document.getElementById("txttelefono").value == "") {
        document.getElementById("txttelefono").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txttelefono").className = "form-control is-valid";
    }
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (document.getElementById("txtmail").value == "") {
        document.getElementById("txtmail").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmail").value)) {
            document.getElementById("txtmail").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                val = 1;
                document.getElementById("txtmail").className = "form-control is-invalid";
                document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'

            } else {

                document.getElementById("txtmail").className = "form-control is-valid";
            }
        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRut").value == "") {
        document.getElementById("txtRut").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRut").value)) {
            document.getElementById("txtRut").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {
            if (respuestaRut.length != 0) {
                val = 1;
                document.getElementById("txtRut").className = "form-control is-invalid";
                document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'

            } else {

                document.getElementById("txtRut").className = "form-control is-valid";
            }
        }
    }
    return val
}

function validarDatosM() {
    var val = 0;

    if (document.getElementById("txtnombre").value == "") {
        document.getElementById("txtnombre").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombre").className = "form-control is-valid";
    }
    if (document.getElementById("txtdireccion").value == "") {
        document.getElementById("txtdireccion").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccion").className = "form-control is-valid";
    }
    if (document.getElementById("txtRut").value == "") {
        document.getElementById("txtRut").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtRut").className = "form-control is-valid";
    }
    if (document.getElementById("txttelefono").value == "") {
        document.getElementById("txttelefono").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txttelefono").className = "form-control is-valid";
    }
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (document.getElementById("txtmail").value == "") {
        document.getElementById("txtmail").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmail").value)) {
            document.getElementById("txtmail").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                //console.log(respuestaModificar.Mail_Cliente)
                //console.log(respuestaMail[0].Mail_Cliente)
                if (respuestaModificar.Mail_Trabajador == respuestaMail[0].Mail_Trabajador) {
                    document.getElementById("txtmail").className = "form-control is-valid";
                } else {
                    val = 1;
                    document.getElementById("txtmail").className = "form-control is-invalid";
                    document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtmail").className = "form-control is-valid";
            }
        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRut").value == "") {
        document.getElementById("txtRut").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRut").value)) {
            document.getElementById("txtRut").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {
            if (respuestaRut.length != 0) {

                if (respuestaModificar.Rut_Trabajador == respuestaRut[0].Rut_Trabajador) {
                    document.getElementById("txtRut").className = "form-control is-valid";
                } else {

                    val = 1;
                    document.getElementById("txtRut").className = "form-control is-invalid";
                    document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtRut").className = "form-control is-valid";
            }

        }
    }
    return val
}

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
//            document.getElementById("txtmail").className = "form-control is-valid";
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
//            document.getElementById("txtRut").className = "form-control is-valid";
//        }
//    }
//    return val
//}

//function GuardarDatos() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatos() == 0) {
//        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
//                    if (res == "1") {
//                        listar();
//                        Limpiar();
//                        $('input').removeClass('is-valid');
//                        Correcto("Se realizo exitosamente");
//        }
//      })
//    }
     
    


//}

//function ModificarDatos() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatos() == 0) {
//        fetchPostText("Trabajador/guardarDatos", frm, function (res) {
//                    if (res == "1") {
//                        listar();
//                        Limpiar();
//                        Correcto("Se realizo exitosamente");
//                    }
//        })
    
//    }
        


//}

function Limpiar() {
   
    LimpiarDatos("formulario", "ID_Trabajador", "ID_Automotriz");
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal()
}
function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}

function Editar(id) {
    /*fetchget("/Marca/RecuperarDatos/?id=" + id, function (res) {
        setN("ID_Marca",res.ID_Marca);
        setN("Nombre_Marca",res.Nombre_Marca);
    })*/
    removeVal()
    recuperarGenerico("Trabajador/RecuperarDatos/?id=" + id, "formulario");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}



function Eliminar(id) {
    fetchGetText("Trabajador/EliminarTrabajador/?id=" + id, function (res) {
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
