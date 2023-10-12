window.onload = function () {
    listarAverias();
    llenadoboxM();
}


function listarAverias() {
    var idR = document.getElementById("txtidRecepcion").value;
    pintar({
        url: "Danos/lista/?id="+ idR,
        id: "divTabla",
        cabeceras: ["Nombre", "Especificacion"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: ["Nombre_Averia", "Especificacion"],
        eliminar: true,
        editar: true,
        propiedadId: "ID_Averia"
    })
}


function llenadoboxM() {
    url = "Averias/lista"
    var comboBox = "<select id='comboA' name='ID_Averia'>";
    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]

            comboBox += "<option value=" + fila["ID_Averia"] + ">" + fila["Nombre_Averia"] + "</option>";


        } comboBox += "</select>";

        document.getElementById("comboA").innerHTML = comboBox;
    })


}



function GuardarDatos() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);

    //console.log(document.getElementById("txtCustodia").value);

    fetchPostText("Danos/GuardarDatos", frm, function (res) {
        if (res != "0") {

            Limpiar();
            listarAverias();
            Correcto("Se realizo exitosamente");


        } else {
            Error("La averia que intenta ingresar, ya esta especificada")
        }
    })

}


function ModificarDatos() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);

    fetchPostText("Danos/ModificarDatos", frm, function (res) {

        if (res != "0") {

            Limpiar();
            listarAverias();
            Correcto("Se realizo exitosamente");
            DisplaybtnForm("btnAgregar", "");
            DisplaybtnForm("btnModificar", "none");
        } 
    })

}

function Limpiar() {

    LimpiarDatos("frmRecepción", "", ["ID_Averia", "ID_Recepcion"]);
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
}

function Editar(id) {

    var idR = document.getElementById("txtidRecepcion").value;

    /*recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", ["Color"]);*/
    recuperarGenerico("Danos/RecuperarDatos/?idR=" + idR + "&idA=" + id, "frmRecepción", ["ID_Recepcion"])
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}


function Select() {
    var idR = document.getElementById("txtidRecepcion").value;
    var url = "Danos/DatosSession/?id=" + idR;


    fetchget(url, function (res) {
        if (res.length == 0) {

            ConfimacionAV("¿Desea proceder sin ingresar ninguna averia?", "Confirmación", function (rpta) {
                document.location.href = setUrl("Recepcion/FrmRVista");
            });
           /* Error("Ingrese a lo menos una averia");*/
        } else {
            Correcto("Correcto");
           document.location.href = setUrl("Recepcion/FrmRVista");
        }
    })



}

function ConfimacionAV(texto = "¿Desea guardar los cambios?", tittle = "Confirmación", callback) {
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
        if (result.isConfirmed) {
            document.location.href = setUrl("Recepcion/FrmRVista");
        }
    })
}


function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}


function Eliminar(id) {
    var idR = document.getElementById("txtidRecepcion").value;
    fetchGetText("Danos/Eliminar/?idR=" + idR + "&idA="+ id  , function (res) {
        if (res == "1") {
            listarAverias();
            Correcto("Se elimino Correctamente");
            DisplaybtnForm("btnAgregar", "");
            DisplaybtnForm("btnModificar", "none");
        }


    })
   
}


