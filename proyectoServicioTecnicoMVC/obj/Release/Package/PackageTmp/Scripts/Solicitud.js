window.onload = function () {
    listar()
}


function listar() {


    pintar({
        //popup: true,
        //idPopup: "exampleModal",
        url: "HorarioAgendamiento/ListarSolicitudFecha/?fecha=",
        id: "divTabla",
        cabeceras: [/*"ID",*/ "Cliente","Fono","Fecha","Dia", "Inicio","Fin","Solicitud"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ "Nombre_Cliente", "Fono_Cliente", "Fecha_Agendamiento", "Dia_Semanal", "Hora_Inicio", "Hora_Fin","Estado"],
        eliminar: false,
        editar: false,
        seleccionar: false,
        formulario: false,
        formularioB: false,
        formularioE: false,
        verDocumento: false,
        propiedadId: "ID_Agendamiento",
    }, {
        busqueda: true,
        maxlength: 10,
        cantB: false,
        EliminarS: true,
        url: "HorarioAgendamiento/ListarSolicitudFecha",
        nombreparametro: "fecha",
       /* nombreparametroD: "fecha",*/
        id: "txtBusquedaSolicitud",
        idBusqueda: "seccionBuscar",
        idDominante: "txtidVehiculo",
        type: "date",
        funcion: "onchange",
        txtBuscar: "Fecha"
    })
}




function EliminarExp() {
    Confimacion("¿Esta seguro que desea eliminar las solicitudes expiradas a la fecha?", "Confirmación", function (rpta) {

    });
}

function Confimacion(texto = "¿Desea guardar los cambios?", tittle = "Confirmación", callback) {
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
        EliminarToday();
    })
}


function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


function EliminarToday() {

    fetchGetText("AgendamientoHora/EliminarExpiradas", function (res) {
        if (res != "0") {
            listar()
            Correcto("Se elimino Correctamente");
        } else {
            Error("No se encontraron solicitudes expiradas");
        }


    })

}

