
/*creo que no se usa*/

window.onload = function () {
    listar()
}


function listar() {


    pintar({
        //popup: true,
        //idPopup: "exampleModal",
        url: "HorarioAgendamiento/ListarSolicitudFecha/?fecha=",
        id: "divTabla",
        cabeceras: [/*"ID",*/  /*"Dia",*/ "Inicio", "Fin"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ /*"Dia_Semanal", */"Hora_Inicio", "Hora_Fin"],
        eliminar: true,
        editar: false,
        seleccionar: false,
        formulario: false,
        formularioB: false,
        formularioE: false,
        verDocumento: false,
        propiedadId: "ID_Agendamiento",
    }, {
        busqueda: false,
        maxlength: 10,
        cantB: false,
        url: "HorarioAgendamiento/ListarSolicitudFecha",
        nombreparametro: "fecha",
        /* nombreparametroD: "fecha",*/
        id: "txtBusquedaSolicitud",
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

    fetchGetText("WebsiteClient/guardarAgendamiento/?id=" + id, function (res) {
        if (res != "0") {
            listarRecepcion();
            Correcto("Se elimino Correctamente");
        }


    })

}

