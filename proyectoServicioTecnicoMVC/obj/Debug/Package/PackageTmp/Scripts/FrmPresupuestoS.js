window.onload = function () {
    listarRecepcion()
}


function listarRecepcion() {
    var idVehiculo = document.getElementById("txtidVehiculo").value;

    pintar({
        url: "Presupuesto/listaV/?id=" + idVehiculo,
        id: "divTabla",
        cabeceras: [/*"ID",*/ "Fecha de Creación", "Modelo", "Validez"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Vehiculo",*/ "Fecha_Presupuesto", "Modelo_Marca", "Validez"],
        eliminar: true,
        editar: false,
        seleccionar: false,
        formulario: false,
        formularioB: false,
        formularioE: true,
        verDocumento: true,
        propiedadId: "ID_Presupuesto",
    }, {
        busqueda: true,
        maxlength: 10,
        cantB: true,
        url: "Presupuesto/listaVF",
        nombreparametro: "id",
        nombreparametroD: "fecha",
        id: "txtBusquedaPresupuesto",
        idD: "txtidVehiculo",
        idBusqueda: "seccionBuscar",
        idDominante: "txtidVehiculo",
        type: "date",
        funcion: "onchange",
        txtBuscar: "Buscar por Fecha"
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


function Ver(id) {
    var url = "Presupuesto/DatosSessionVer/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Recepcion == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("Presupuesto/FrmPVistaS");
        }
    })
}




function Select(id) {
    var url = "Presupuesto/DatosSession/?id=" + id;


    fetchget(url, function (res) {
        if (res.ID_Recepcion == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
            document.location.href = setUrl("Presupuesto/FrmPEdit");
        }
    })


}



function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


function Eliminar(id) {
    Confimacion(id,"¿Esta seguro que desea eliminar el documento?", "Confirmación", function (rpta) {

    });

}


function Confimacion(id,texto = "¿Desea guardar los cambios?", tittle = "Confirmación", callback) {
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
              fetchGetText("Presupuesto/EliminarPresupuesto/?id=" + id, function (res) {
            if (res != "0") {
                listarRecepcion();
                Correcto("Se elimino Correctamente");
            }


        })
        }
      
    })
}

