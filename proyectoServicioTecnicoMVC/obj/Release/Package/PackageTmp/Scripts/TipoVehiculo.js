window.onload = function () {
    listar();

}

function listar() {
    pintar({
        url: "TipoVehiculo/lista",
        id: "divTabla",
        cabeceras: [/*"ID", */ "Nombre"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",*/ "Producto"],
        eliminar: true,
        editar: true,
        propiedadId: "ID_TipoVehiculo"
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

var respuestaNombre;
function GuardarDatos() {

    var nombre = document.getElementById("txtProducto").value;

    var url = "TipoVehiculo/VerificarTipo/?nombreTipo=" + nombre;
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
        fetchPostText("TipoVehiculo/guardarDatos", frm, function (res) {
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

    var nombre = document.getElementById("txtProducto").value;

    var url = "TipoVehiculo/VerificarTipo/?nombreTipo=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)



    var id = document.getElementById("txtIdTipoVehiculo").value;
    url = "TipoVehiculo/RecuperarDatos/?id=" + id;
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
        fetchPostText("TipoVehiculo/guardarDatos", frm, function (res) {
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

    if (document.getElementById("txtProducto").value == "") {
        document.getElementById("txtProducto").className = "form-control is-invalid";
        document.getElementById("invalid-Producto").innerHTML = 'Debe ingresar un tipo de vehiculo'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            val = 1;
            document.getElementById("txtProducto").className = "form-control is-invalid";
            document.getElementById("invalid-Producto").innerHTML = 'El tipo de vehiculo que intenta ingresar ya existe'

        } else {

            document.getElementById("txtProducto").className = "form-control is-valid";
        }
    }

    return val
}

function validarDatosM() {

    var val = 0;

    if (document.getElementById("txtProducto").value == "") {
        document.getElementById("txtProducto").className = "form-control is-invalid";
        document.getElementById("invalid-Producto").innerHTML = 'Debe ingresar un tipo de vehiculo'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            if (respuestaModificar.Producto == respuestaNombre[0].Producto) {
                document.getElementById("txtProducto").className = "form-control is-valid";
            } else {
                val = 1;
                document.getElementById("txtProducto").className = "form-control is-invalid";
                document.getElementById("invalid-Producto").innerHTML = 'El tipo de vehiculo que intenta ingresar ya existe'
            }

        } else {

            document.getElementById("txtProducto").className = "form-control is-valid";
        }
    }

    return val


}


//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtProducto").value == "") {
//        document.getElementById("txtProducto").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtProducto").className = "form-control is-valid";
//    }
    

//    return val
//}

//function GuardarDatos() {
//    var formulario = document.getElementById("formulario");
//    var frm = new FormData(formulario);

//    if (validarDatos() == 0) {
//        fetchPostText("TipoVehiculo/guardarDatos", frm, function (res) {
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
//        fetchPostText("TipoVehiculo/guardarDatos", frm, function (res) {
//            if (res == "1") {
//                listar();
//                Limpiar();
//                Correcto("Se realizo exitosamente");
//            }
//        })

//    }
//}


function Limpiar() {

    LimpiarDatos("formulario", "ID_TipoVehiculo", "");
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
    recuperarGenerico("TipoVehiculo/RecuperarDatos/?id=" + id, "formulario");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}



function Eliminar(id) {
    fetchGetText("TipoVehiculo/EliminarTipoVehiculo/?id=" + id, function (res) {
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
