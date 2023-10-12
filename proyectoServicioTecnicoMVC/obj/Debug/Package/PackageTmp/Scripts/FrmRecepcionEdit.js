

window.onload = function () {

   llenadoboxP();
    llenadoboxT();
    llenadoCheck();

       function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

  

    
    delay(2000).then(() => Recuperar());

   
}


//function recuperarbyid(){
//    var iDT = document.getElementById("idtrabajador").value;
//    document.getElementById("comboT").value = iDT

//    var iDP = document.getElementById("idpago").value;
//    document.getElementById("comboP").value = iDP

//}

//Promise.all([fetch("/Marca/lista"), fetch("/Trabajador/lista")])
//    .then(results => Promise.all(results.map(r => r.json())))
//    .then(results => {
//        var x = results[0];
//        var y = results[1];

//        console.log(x)
//        console.log(x.length)
//        console.log(y.length)
//        console.log(y[0]["Nombre_Trabajador"])


//    })


function llenadoboxT() {
    url = "Trabajador/lista"
    var comboBox = "<select id='comboT' name='ID_Trabajador'>";
    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]


            comboBox += "<option value=" + fila["ID_Trabajador"] + ">" + fila["Nombre_Trabajador"] + "</option>";


        } comboBox += "</select>";

      

        document.getElementById("comboT").innerHTML = comboBox;
        //var iDT = document.getElementById("idtrabajador").value;
        //document.getElementById("comboT").value = iDT

    })
   


}


function Recuperar() {
    var idR = document.getElementById("txtidRecepcion").value
    recuperarEspecifico("Recepcion/RecuperarDatos/?id=" + idR, "frmRecepción"/*,["ID_Pago"]*/);

}

function recuperarEspecifico(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    var nombreName;
    fetchget(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            //Si esta incluido no se toma
            nombreName = elementos[i].name;
            if (!excepciones.includes(nombreName)) {
                if (elementos[i].type.toUpperCase() == "CHECKBOX") {
                    if (res[nombreName] == 1) {
                        setCheck(nombreName,0)
                    } else {
                        setCheck(nombreName, 1)
                    }
                } else {
                    setN(nombreName, res[nombreName])
                }
                     
                
            }

        }
    });


}

//if (elementos[i].type.toUpperCase() == "CHECKBOX") {
//    if (res[nombreName].value == 1) {
//        setCheck(nombreName)
//    }

//} else {
//    setN(nombreName, res[nombreName])
//}


function llenadoboxP() {
    url = "Pago/lista"
    document.getElementById("comboP").innerHTML = comboBox;
   
  
    var comboBox = "<select id='comboP' name='ID_Pago'>";
    fetchget(url, function (res) {
        var fila;
        for (var i = 0; i < res.length; i++) {
            fila = res[i]

            comboBox += "<option value=" + fila["ID_Pago"] + ">" + fila["Estado_Pago"] + "</option>";


        } comboBox += "</select>";

        document.getElementById("comboP").innerHTML = comboBox;

    })

 

    //var iDP = document.getElementById("idpago").value;
    //document.getElementById("comboP").value = iDP


    //var idR = document.getElementById("txtidRecepcion").value
    //url = "Recepcion/RecuperarDatos?id=" + idR
    //fetchget(url, function (res) {
    //    console.log(res["ID_Pago"])
    //    document.getElementByName("ID_Pago").value = res["ID_Pago"];
    //})
}

function llenadoCheck() {
    var idR = document.getElementById("txtidRecepcion").value

    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsolutaE = window.location.protocol + "//" + window.location.host + raiz + "Equipamiento/lista";
    var urlAbsolutaRE = window.location.protocol + "//" + window.location.host + raiz + "Recepcion/listaRE/?id=" + idR;


    var check = "<div id='ContainerCheckE' class='checkEquipamiento'>";
    Promise.all([fetch(urlAbsolutaE), fetch(urlAbsolutaRE)])
        .then(results => Promise.all(results.map(r => r.json())))
        .then(results => {
            
            var res = results[0];
            var resRE = results[1];
            var fila;
            for (var i = 0; i < res.length; i++) {
                fila = res[i]
                var contiene = 0;
                for (var x = 0; x < resRE.length; x++){
                    filaRE = resRE[x]
                    if (fila["ID_Equipamiento"] == filaRE["ID_Equipamiento"]) {
                        contiene = 1;
                        break;
                    } else {
                        contiene = 0;
                    }
                }
                if (contiene == 1) {
                    check += "<div class='ValorCheck'><label class='m-1'><input type='checkbox' id='checkboxs' name='valor[]' value='" + fila["ID_Equipamiento"] + "' checked/> " + fila["Nombre_Equipamiento"] + "</label></div>";
                } else {
                    check += "<div class='ValorCheck'><label class='m-1'><input type='checkbox' id='checkboxs' name='valor[]' value='" + fila["ID_Equipamiento"] + "'/> " + fila["Nombre_Equipamiento"] + "</label></div>";
                }




            }
            check += "</div>";

            document.getElementById("ContainerCheckE").innerHTML = check;

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

function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}

function validarDatos() {
    var val = 0;

    if (document.getElementById("txtKilometraje").value == "") {
        document.getElementById("txtKilometraje").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtKilometraje").className = "form-control is-valid";
    }


    if (document.getElementById("txtfechaRecepcion").value == "") {
        if (document.getElementById("txtinicioServicio").value == "") {
            document.getElementById("txtinicioServicio").className = "form-control is-valid";
        } else {
            document.getElementById("txtinicioServicio").className = "form-control is-invalid";
            document.getElementById("invalid-Inicio").innerHTML = 'Primero ingrese una fecha de recepción del vehiculo'
            val = 1;
        }

    } else {

        if (document.getElementById("txtinicioServicio").value == "") {
            document.getElementById("txtinicioServicio").className = "form-control is-valid";
        }
        else {
            if (document.getElementById("txtinicioServicio").value < document.getElementById("txtfechaRecepcion").value) {
                document.getElementById("txtinicioServicio").className = "form-control is-invalid";
                document.getElementById("invalid-Inicio").innerHTML = 'La fecha de inicio del servicio debe ser mayor o igual a la de recepción de vehiculo'
                val = 1;

            } else {
                document.getElementById("txtinicioServicio").className = "form-control is-valid";
            }

        }

    }


    if (document.getElementById("txtfechaRecepcion").value == "") {
        if (document.getElementById("txtfinServicio").value == "") {
            document.getElementById("txtfinServicio").className = "form-control is-valid";
        } else {
            document.getElementById("txtfinServicio").className = "form-control is-invalid";
            document.getElementById("invalid-Fin").innerHTML = 'Primero ingrese una fecha de recepción del vehiculo'
            val = 1;
        }

    } else {

        if (document.getElementById("txtfinServicio").value == "") {
            document.getElementById("txtfinServicio").className = "form-control is-valid";
        }
        else {
            if (document.getElementById("txtinicioServicio").value == "") {
                document.getElementById("txtfinServicio").className = "form-control is-invalid";
                document.getElementById("invalid-Fin").innerHTML = 'Primero ingrese una fecha de inicio del servicio'
                val = 1;

            } else {
                if (document.getElementById("txtfinServicio").value < document.getElementById("txtinicioServicio").value) {
                    document.getElementById("txtfinServicio").className = "form-control is-invalid";
                    document.getElementById("invalid-Fin").innerHTML = 'El fin de servicio debe ser mayor o igual al inicio del servicio'
                    val = 1;
                } else {
                    document.getElementById("txtfinServicio").className = "form-control is-valid";
                }
            }


        }

    }

    if (document.getElementById("txtfechaRecepcion").value == "") {
        document.getElementById("txtfechaRecepcion").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtfechaRecepcion").className = "form-control is-valid";
    }

    if (document.getElementById("txtUbicacion").value == "" || document.getElementById("txtUbicacion").value != "") {
        document.getElementById("txtUbicacion").className = "form-control is-valid";

    }
    if (document.getElementById("txtCustodia").value == "" || document.getElementById("txtCustodia").value != "") {
        document.getElementById("txtCustodia").className = "form-control is-valid";

    }
    if (document.getElementById("txtObservaciones").value == "" || document.getElementById("txtObservaciones").value != "") {
        document.getElementById("txtObservaciones").className = "form-control is-valid";

    }



    return val
}



function GuardarDatos() {
    var frmR = document.getElementById("frmRecepción");
    var frm = new FormData(frmR);
    //console.log(document.getElementById("txtCustodia").value);
    if (validarDatos() == 0) {
        fetchPostText("Recepcion/EditarDatos", frm, function (res) {
            if (res != "0") {

                /*       Limpiar();*/
                Correcto("Se realizo exitosamente");
             /*   document.location.href = setUrl("Recepcion/FrmRAverias");*/
                document.location.href = setUrl("Recepcion/FrmRAvEdit");
            } 
        })
    }


}


//function ModificarDatos() {
//    var frmR = document.getElementById("frmRecepción");
//    var frm = new FormData(frmR);

//    fetchPostText("Vehiculo/guardarDatos", frm, function (res) {

//        if (res == "1") {

//            Limpiar();
//             Correcto("Se realizo exitosamente");

//        }

//    })

//}

function Limpiar() {
    /*setN("Nombre_Marca", "");*/

    //var elementos = document.querySelectorAll("#frmMarca [name]");
    //for (var i = 0; i < elementos.length; i++) {
    //    elementos[i].value = "";
    //}


    /*Bloquear datos*/
    //LimpiarDatos("frmRecepción", "ID_Marca", "Trabajador");
    //$("#btnlimpiar").click(function () {
    //    $("#txtnombreMarca").prop('readonly', true);
    //});
  /*  LimpiarDatos("frmRecepción", "ID_Vehiculo", ["ID_Trabajador", "ID_Pago", "ID_Cliente", "Bencina", "Fecha_Recepcion", "ID_Recepcion", "ID_Vehiculo", "Ubicacion"]);*/
    llenadoCheck();
    Recuperar()
    removeVal()
    //var comboT = document.getElementById('comboB');
    //console.log(comboB);
    //comboB.value = "E";
    //document.getElementById("checkLlave").checked = false;
    //document.getElementById("checkDocumento").checked = false;
    /*setC(selector, false)*/
    //llenadoboxM();
    //llenadoboxM();
    //llenadoboxTV();
    //llenadoboxE();
    //llenadoradioM(true, 0, true)


    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}

//function Editar(id) {


//    /*recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRecepción", ["Color"]);*/
//    recuperarAuto("Vehiculo/RecuperarVehiculo/?id=" + id, "frmRecepción", ["ID_Cliente"])
//    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
//    DisplaybtnForm("btnAgregar", "none");
//    DisplaybtnForm("btnModificar", "");
//}


//function Select(id) {
//    var url = "Vehiculo/DatosSession/?id=" + id;


//    fetchget(url, function (res) {
//        if (res.ID_Vehiculo == 0) {
//            Error("No se encontro");
//        } else {
//            Correcto("Vamos");
//            document.location.href = setUrl("Recepcion/FrmRFormulario");
//        }
//    })

//    /*recuperarGenerico("Cliente/DatosSession/?id=" + id, "frmRecepción" *//*,["ID_AUTOMOTRIZ", "MAIL_CLIENTE", "USUARIO_CLIENTE","CLAVE_CLIENTE"]*//*);*/



//    //bloquearInput("frmRecepción");
//    //document.getElementById("btnAgregar").style.display = "none";
//    //document.getElementById("btnModificar").style.display = "";
//    //DisplaybtnForm("btnSeguir", "");



//}

//function BloqueobtnForm(idBtn, bloqueo) {
//    const button = document.querySelector('#' + idBtn);
//    button.disabled = bloqueo;
//    if (bloqueo == true) {
//        document.getElementById(idBtn).style.display = "";
//    }
//}

function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}




