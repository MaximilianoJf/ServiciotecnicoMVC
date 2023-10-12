window.onload = function () {
    listarMarca();

}

function listarMarca() {
    pintar({
        url: "Marca/lista",
        id: "divTabla",
        cabeceras: [/*"ID", */"Marca"],
        colspan: 2,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",*/ "Nombre_Marca"],
        eliminar: true,
        editar: true,
        seleccionar: true,
        propiedadId: "ID_Marca",
        propiedadSId: "ID_Modelo",
        urlS: "/Modelo/listaModeloMarca/?id=",
        cabecerasS: [/*"ID", */"Nombre"],
        propiedadesS: [/*"ID_Marca",*/ "Nombre_Modelo"],
        SelectName: "Modelos"
    }, {
        busqueda: true,
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

var respuestaNombre;
function GuardarDatos() {

    var nombre = document.getElementById("txtnombreMarca").value;

    var url = "Marca/VerificarMarca/?nombreMarca=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)


    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var frmMarca = document.getElementById("frmMarca");
    var frm = new FormData(frmMarca);
   

    if (validarDatos() == 0) {
        fetchPostText("Marca/GuardarDatos", frm, function (res) {
            if (res == "1") {
                listarMarca();
                Limpiar();
                Correcto("Se realizo exitosamente");
            } else {
                Error("Revise todos los datos que intenta ingresar")
                DisplaybtnForm("btnAgregar", "none");
                DisplaybtnForm("btnModificar", "");
            }
        })
    }
}

var respuestaModificar;
function ModificarDatos() {

    var nombre = document.getElementById("txtnombreMarca").value;

    var url = "Marca/VerificarMarca/?nombreMarca=" + nombre;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaNombre = data)

    var id = document.getElementById("txtidMarca").value;
    url = "Marca/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)



    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var frmMarca = document.getElementById("frmMarca");
    var frm = new FormData(frmMarca);
    if (validarDatosM() == 0) {
        fetchPostText("Marca/GuardarDatos", frm, function (res) {
                if (res == "1") {
                    buscar()
                    Limpiar();
                    Correcto("Se realizo exitosamente");
                } else {
                    Error("Revise todos los datos que intenta ingresar")
                    DisplaybtnForm("btnAgregar", "none");
                    DisplaybtnForm("btnModificar", "");
                }
        })
    }
}

function validarDatos() {
    var val = 0;
    

    if (document.getElementById("txtnombreMarca").value == "") {
        document.getElementById("txtnombreMarca").className = "form-control is-invalid";
        document.getElementById("invalid-Marca").innerHTML = 'Debe ingresar un nombre en marca'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            val = 1;
            document.getElementById("txtnombreMarca").className = "form-control is-invalid";
            document.getElementById("invalid-Marca").innerHTML = 'El nombre que intenta ingresar ya existe'

        } else {

            document.getElementById("txtnombreMarca").className = "form-control is-valid";
        }
    }

    return val
}

function validarDatosM() {
        var val = 0;

    if (document.getElementById("txtnombreMarca").value == "") {
        document.getElementById("txtnombreMarca").className = "form-control is-invalid";
        document.getElementById("invalid-Marca").innerHTML = 'Debe ingresar un nombre en marca'
        val = 1;

    } else {
        if (respuestaNombre.length != 0) {
            //console.log(respuestaModificar.Patente)
            //console.log(respuestaPatente[0].Patente)
            if (respuestaModificar.Nombre_Marca == respuestaNombre[0].Nombre_Marca) {
                document.getElementById("txtnombreMarca").className = "form-control is-valid";
            } else {
                val = 1;
                document.getElementById("txtnombreMarca").className = "form-control is-invalid";
                document.getElementById("invalid-Marca").innerHTML = 'El nombre que intenta ingresar ya existe'
            }


        } else {

            document.getElementById("txtnombreMarca").className = "form-control is-valid";
        }
    }

   return val
}


//function validarDatos() {
//    var val = 0;

//    if (document.getElementById("txtnombreMarca").value == "") {
//        document.getElementById("txtnombreMarca").className = "form-control is-invalid";
//        val = 1;

//    } else {
//        document.getElementById("txtnombreMarca").className = "form-control is-valid";
//    }

//   return val
//}

//function GuardarDatos() {
//    var frmMarca = document.getElementById("frmMarca");
//    var frm = new FormData(frmMarca);
//    if (validarDatos() == 0) {
       
//         fetchPostText("Marca/GuardarDatos", frm, function (res){
//                if (res == "1") {
//                    listarMarca();
//                    Limpiar();
//                    $('input').removeClass('is-valid');
//                    Correcto("Se realizo exitosamente");
//                } 
//            })
//    }

   
//}

//function ModificarDatos() {
//    var frmMarca = document.getElementById("frmMarca");
//    var frm = new FormData(frmMarca);
//    if (validarDatos() == 0) {
//        fetchPostText("Marca/GuardarDatos", frm, function (res) {
//                if (res == "1") {
//                    listarMarca();
//                    Limpiar();
//                    Correcto("Se realizo exitosamente");
//                } else {
//                    Error("Revise todos los datos que intenta ingresar")
//                    DisplaybtnForm("btnAgregar", "none");
//                    DisplaybtnForm("btnModificar", "");
//                }
//        })
//    }
    

//}
function Limpiar() {
    /*setN("Nombre_Marca", "");*/

    //var elementos = document.querySelectorAll("#frmMarca [name]");
    //for (var i = 0; i < elementos.length; i++) {
    //    elementos[i].value = "";
    //}
  /*  LimpiarDatos("frmMarca", ["ID_Marca"]);*/
    LimpiarDatos("frmMarca", "ID_Marca", "");
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
    recuperarGenerico("Marca/RecuperarDatos/?id=" + id, "frmMarca");
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}




function Eliminar(id) {
    fetchGetText("Marca/EliminarMarca/?id=" + id, function (res) {
        if (res == "1") {
            listarMarca();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar marca asociada a documentos")
        }
       

    })
    //Confimacion("¿Desea eliminar el dato de marca?", "Confimar eliminación", function (res) {
    //    fetchGetText("Marca/EliminarMarca/?id=" + id, function (rpta) {
    //        if (rpta == "1") {
    //            Correcto("Se elimino correctamente");
    //            listarMarca();
    //        }

    //    })
    //})
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

    /*recuperarGenerico("Cliente/DatosSession/?id=" + id, "frmRecepción" *//*,["ID_AUTOMOTRIZ", "MAIL_CLIENTE", "USUARIO_CLIENTE","CLAVE_CLIENTE"]*//*);*/



    //bloquearInput("frmRecepción");
    //document.getElementById("btnAgregar").style.display = "none";
    //document.getElementById("btnModificar").style.display = "";
    //DisplaybtnForm("btnSeguir", "");



}


function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}
