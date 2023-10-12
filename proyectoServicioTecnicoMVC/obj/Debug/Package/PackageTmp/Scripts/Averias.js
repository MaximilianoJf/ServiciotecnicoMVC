window.onload = function () {
    listar();

}

function listar() {
    pintar({
        url: "Averias/lista",
        id: "divTabla",
        cabeceras: [/*"ID", */ "Averia"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",*/ "Nombre_Averia"],
        eliminar: true,
        editar: true,
        propiedadId: "ID_Averia"
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



function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var respuestaNombre;
function GuardarDatos() {

    var nombre = document.getElementById("txtAveria").value;

    var url = "Averias/VerificarAveria/?nombreAveria=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)


    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var formulario = document.getElementById("formulario");
    var frm = new FormData(formulario);

    if (validarDatos() == 0) {
        fetchPostText("Averias/guardarDatos", frm, function (res) {
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

    var nombre = document.getElementById("txtAveria").value;

    var url = "Averias/VerificarAveria/?nombreAveria=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)


    var id = document.getElementById("txtIDAveria").value;
    url = "Averias/RecuperarDatos/?id=" + id;
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
        fetchPostText("Averias/guardarDatos", frm, function (res) {
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

    if (document.getElementById("txtAveria").value == "") {
        document.getElementById("txtAveria").className = "form-control is-invalid";
        document.getElementById("invalid-Averia").innerHTML = 'Debe ingresar una Averia'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            val = 1;
            document.getElementById("txtAveria").className = "form-control is-invalid";
            document.getElementById("invalid-Averia").innerHTML = 'La averia que intenta ingresar ya existe'

        } else {

            document.getElementById("txtAveria").className = "form-control is-valid";
        }
    }

    return val
}

function validarDatosM() {

    var val = 0;

    if (document.getElementById("txtAveria").value == "") {
        document.getElementById("txtAveria").className = "form-control is-invalid";
        document.getElementById("invalid-Averia").innerHTML = 'Debe ingresar una Averia'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            if (respuestaModificar.Nombre_Averia == respuestaNombre[0].Nombre_Averia) {
                document.getElementById("txtAveria").className = "form-control is-valid";
            } else {
                val = 1;
                document.getElementById("txtAveria").className = "form-control is-invalid";
                document.getElementById("invalid-Averia").innerHTML = 'La averia que intenta ingresar ya existe'
            }

        } else {

            document.getElementById("txtAveria").className = "form-control is-valid";
        }
    }

    return val


}



//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtAveria").value == "") {
//        document.getElementById("txtAveria").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtAveria").className = "form-control is-valid";
//    }

//    return val
//}

//function GuardarDatos() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatos() == 0) {
//        fetchPostText("Averias/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listar();
//                Limpiar();
//                $('input').removeClass('is-valid');
//                Correcto("Se realizo exitosamente");
//            }
//        })
//    }
//}


//function ModificarDatos() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatos() == 0) {
//        fetchPostText("Averias/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listar();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//            }
//        })

//    }
//}

function Limpiar() {

    LimpiarDatos("formulario", "ID_Equipamiento", "");
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
    recuperarGenerico("Averias/RecuperarDatos/?id=" + id, "formulario");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}



function Eliminar(id) {
    fetchGetText("Averias/EliminarAverias/?id=" + id, function (res) {
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
