window.onload = function () {
    listarModelo();

}

function listarModelo() {
    var idMarca = document.getElementById("txtidMarca").value;

    pintar({

        url: "Modelo/listaModeloMarca/?id=" + idMarca,
        id: "divTabla",
        cabeceras: [/*"ID",*/ "Modelo"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/"Nombre_Modelo"],
        eliminar: true,
        editar: true,
        seleccionar: false,
        formulario: false,
        propiedadId: "ID_Modelo",
    }, {
        busqueda: false,

    })
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

var respuestaNombre;
function GuardarDatos() {

    var nombre = document.getElementById("txtnombreModelo").value;

    var url = "Modelo/VerificarModelo/?nombreModelo=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)


    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var frmM = document.getElementById("frmM");
    var frm = new FormData(frmM);
    if (validarDatos() == 0) {

        fetchPostText("Modelo/GuardarDatos", frm, function (res) {
            if (res == "1") {
                listarModelo();
                Limpiar();
                $('input').removeClass('is-valid');
                Correcto("Se realizo exitosamente");
            }
        })
    }
}

var respuestaModificar;
function ModificarDatos() {
    var nombre = document.getElementById("txtnombreModelo").value;


    var url = "Modelo/VerificarModelo/?nombreModelo=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)


    var id = document.getElementById("txtidModelo").value;
    url = "Modelo/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)




    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var frmM = document.getElementById("frmM");
    var frm = new FormData(frmM);
    if (validarDatosM() == 0) {

        fetchPostText("Modelo/GuardarDatos", frm, function (res) {
            if (res == "1") {
                listarModelo();
                Limpiar();
                $('input').removeClass('is-valid');
                Correcto("Se realizo exitosamente");
            }
        })
    }
}

function validarDatos() {
    var val = 0;

    if (document.getElementById("txtnombreModelo").value == "") {
        document.getElementById("txtnombreModelo").className = "form-control is-invalid";
        document.getElementById("invalid-Modelo").innerHTML = 'Debe ingresar un nombre de modelo'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            val = 1;
            document.getElementById("txtnombreModelo").className = "form-control is-invalid";
            document.getElementById("invalid-Modelo").innerHTML = 'El nombre que intenta ingresar ya existe'

        } else {

            document.getElementById("txtnombreModelo").className = "form-control is-valid";
        }
    }

    return val
}

function validarDatosM() {
    var val = 0;

    if (document.getElementById("txtnombreModelo").value == "") {
        document.getElementById("txtnombreModelo").className = "form-control is-invalid";
        document.getElementById("invalid-Marca").innerHTML = 'Debe ingresar un nombre de modelo'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            //console.log(respuestaModificar.Mail_Cliente)
            //console.log(respuestaMail[0].Mail_Cliente)
            if (respuestaModificar.Nombre_Modelo == respuestaNombre[0].Nombre_Modelo) {
                document.getElementById("txtnombreModelo").className = "form-control is-valid";
            } else {
                val = 1;
                document.getElementById("txtnombreModelo").className = "form-control is-invalid";
                document.getElementById("invalid-Modelo").innerHTML = 'El nombre que intenta ingresar ya existe'
            }

        } else {

            document.getElementById("txtnombreModelo").className = "form-control is-valid";
        }
    }

    return val
}

//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtnombreModelo").value == "") {
//        document.getElementById("txtnombreModelo").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtnombreModelo").className = "form-control is-valid";
//    }

//    return val
//}

//function GuardarDatos() {
//    var frmM = document.getElementById("frmM");
//    var frm = new FormData(frmM);
//    if (validarDatos() == 0) {

//        fetchPostText("Modelo/GuardarDatos", frm, function (res) {
//            if (res == "1") {
//                listarModelo();
//                Limpiar();
//                $('input').removeClass('is-valid');
//                Correcto("Se realizo exitosamente");
//            }
//        })
//    }


//}


//function ModificarDatos() {
//    var frmM = document.getElementById("frmM");
//    var frm = new FormData(frmM);
//    if (validarDatos() == 0) {
//        fetchPostText("Modelo/GuardarDatos", frm, function (res) {
//            if (res == "1") {
//                listarModelo();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//            } else {
//                Error("Revise todos los datos que intenta ingresar")
//                DisplaybtnForm("btnAgregar", "none");
//                DisplaybtnForm("btnModificar", "");
//            }
//        })
//    }


//}

function Limpiar() {

    LimpiarDatos("frmM", "ID_Modelo", "ID_Marca");
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal()
}
function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}

function Editar(id) {

    removeVal()
    recuperarGenerico("Modelo/RecuperarDatos/?id=" + id, "frmM");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}



function Eliminar(id) {
    fetchGetText("Modelo/EliminarModelo/?id=" + id, function (res) {
        if (res == "1") {
            listarModelo();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar modelo asociado a documentos")
        }


    })

}

function Select(id) {
    var url = "Marca/DatosSession/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Marca == 0) {
            Error("No se encontro");
        } else {

            Correcto("Correcto");
            console.log(url);
            document.location.href = setUrl("Modelo/formularioModelo");
        }
    })


}


function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}
