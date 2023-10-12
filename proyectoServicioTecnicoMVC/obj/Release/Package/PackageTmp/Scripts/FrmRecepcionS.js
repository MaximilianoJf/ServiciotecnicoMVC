window.onload = function () {
    listarRecepcion()
}


function listarRecepcion() {
    var idVehiculo = document.getElementById("txtidVehiculo").value;

    pintar({
        //popup: true,
        //idPopup: "exampleModal",
        url: "Recepcion/listaV/?id=" + idVehiculo,
        id: "divTabla",
        cabeceras: [/*"ID",*/ "Fecha de Creación", "Modelo", "Estado de pago"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ "Fecha_Recepcion", "Modelo_Marca", "Estado_Pago"],
        eliminar: true,
        editar: false,
        seleccionar: false,
        formulario: false,
        formularioB: false,
        formularioE: true,
        verDocumento: true,
        propiedadId: "ID_Recepcion",
    }, {
        busqueda: true,
        maxlength: 10,
        cantB: true,
        url: "Recepcion/listaVF",
        nombreparametro: "id",
        nombreparametroD: "fecha",
        id: "txtBusquedaRecepcion",
        idD: "txtidVehiculo",
        idBusqueda: "seccionBuscar",
        idDominante: "txtidVehiculo",
        type: "date",
        funcion: "onchange",
        txtBuscar: "Buscar por Fecha"
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

function Ver(id) {
    var url = "Recepcion/DatosSessionVer/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Recepcion == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("Recepcion/FrmRVistaS");
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
            document.location.href = setUrl("Recepcion/FrmREdit");
        }
    })


}



function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


function Eliminar(id) {
    Confimacion(id, "¿Esta seguro que desea eliminar el documento?", "Confirmación", function (rpta) {

    });
  
}


function Confimacion(id, texto = "¿Desea guardar los cambios?", tittle = "Confirmación", callback) {
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
        if (result.isConfirmed == true) {
            fetchGetText("Recepcion/EliminarRecepcion/?id=" + id, function (res) {
                if (res != "0") {
                    listarRecepcion();
                    Correcto("Se elimino Correctamente");
                }


            })
        }
    })
}



