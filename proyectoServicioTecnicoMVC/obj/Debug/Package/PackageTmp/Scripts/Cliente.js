window.onload = function () {
    listarCliente();
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#txtpassword");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});


function listarCliente() {
    pintar({
        //popup: true,
        idPopup: "exampleModal",
        url: "Cliente/lista",
        id: "divTabla",
        cabeceras: [/*"ID",*/ "RUT", "Nombre", "Dirección", "Fono", "Mail","Usuario"],
        colspan: 3,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Cliente",*/ "Rut_Cliente", "Nombre_Cliente", "Direccion_Cliente", "Fono_Cliente", "Mail_Cliente", "Usuario_Cliente"],
        eliminar: true,
        editar: true,
        seleccionar: false,
        usuario: true,
        auto: true,
        propiedadId: "ID_Cliente"
    }, {
        busqueda: true,
        maxlength: 10,
        url: "Cliente/filtrar",
        nombreparametro: "rut",
        id: "txtBusquedaCliente",
        idBusqueda: "seccionBuscar",
        placeholder: "Ingrese un RUT",
        type: "text"
    })
}






function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

var respuestaRut;
var respuestaMail;
function GuardarDatos() {

    var rut = document.getElementById("txtRutCliente").value;
    var mail = document.getElementById("txtmailCliente").value;

    var url = "Cliente/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)

    url = "Cliente/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)



    delay(1000).then(() => GuardarDatosValidado());


}


function GuardarDatosValidado() {
    var frmR = document.getElementById("frmRCliente");
    var frm = new FormData(frmR);
   
  /*  console.log(respuestaRut)*/
    //if (typeof respuestaRut !== "undefined") {
    //    respValidado = 1;
    //} else {
    //    respValidado = 0;
    //}

    if (validarDatos() == 0) {
        fetchPostText("Cliente/GuardarDatos", frm, function (res) {

            if (res == "1") {
                listarCliente();
                Limpiar();
                Correcto("Se realizo exitosamente");
                removeVal();
            } else {
                Error("Revise todos los datos que intenta ingresar")
            }
        })
    }
}

var respuestaModificar;
function ModificarDatos() {
    var rut = document.getElementById("txtRutCliente").value;
    var mail = document.getElementById("txtmailCliente").value;

    var url = "Cliente/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)


    var id = document.getElementById("txtidCliente").value;
    url = "Cliente/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)

  
    url = "Cliente/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)


    delay(1500).then(() => ModificarDatosValidado());

}


function ModificarDatosValidado() {
    var frmR = document.getElementById("frmRCliente");
    var frm = new FormData(frmR);
    //console.log(respuestaModificar.Rut_Cliente)
    //console.log(respuestaRut[0].Rut_Cliente)
 
    if (validarDatosM() == 0) {
        fetchPostText("Cliente/GuardarDatos", frm, function (res) {

            if (res == "1") {
                listarCliente();
                Limpiar();
                Correcto("Se realizo exitosamente");
                removeVal();
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
    //console.log(respuestaMail)
    //console.log(respuestaRut)

    if (document.getElementById("txtnombreCliente").value == "") {
        document.getElementById("txtnombreCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombreCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txtdireccionCliente").value == "") {
        document.getElementById("txtdireccionCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccionCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txttelefonoCliente").value == "") {
        document.getElementById("txttelefonoCliente").className = "form-control is-invalid";
        val = 1;

    } else {

        document.getElementById("txttelefonoCliente").className = "form-control is-valid";
    }

    /*   let regexMail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');*/
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (document.getElementById("txtmailCliente").value == "") {
        document.getElementById("txtmailCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmailCliente").value)) {
            document.getElementById("txtmailCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                val = 1;
                document.getElementById("txtmailCliente").className = "form-control is-invalid";
                document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'

            } else {

                document.getElementById("txtmailCliente").className = "form-control is-valid";
            }
        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRutCliente").value == "") {
        document.getElementById("txtRutCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRutCliente").value)) {
            document.getElementById("txtRutCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {
            if (respuestaRut.length != 0) {
                val = 1;
                document.getElementById("txtRutCliente").className = "form-control is-invalid";
                document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'
               
            } else {
               
                document.getElementById("txtRutCliente").className = "form-control is-valid";
            }

        }
    }

    return val
}

function validarDatosM() {
    var val = 0;

    if (document.getElementById("txtnombreCliente").value == "") {
        document.getElementById("txtnombreCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtnombreCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txtdireccionCliente").value == "") {
        document.getElementById("txtdireccionCliente").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtdireccionCliente").className = "form-control is-valid";
    }

    if (document.getElementById("txttelefonoCliente").value == "") {
        document.getElementById("txttelefonoCliente").className = "form-control is-invalid";
        val = 1;

    } else {

        document.getElementById("txttelefonoCliente").className = "form-control is-valid";
    }

    /*   let regexMail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');*/
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (document.getElementById("txtmailCliente").value == "") {
        document.getElementById("txtmailCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmailCliente").value)) {
            document.getElementById("txtmailCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            if (respuestaMail.length != 0) {
                //console.log(respuestaModificar.Mail_Cliente)
                //console.log(respuestaMail[0].Mail_Cliente)
                if (respuestaModificar.Mail_Cliente == respuestaMail[0].Mail_Cliente) {
                    document.getElementById("txtmailCliente").className = "form-control is-valid";
                } else {
                    val = 1;
                    document.getElementById("txtmailCliente").className = "form-control is-invalid";
                    document.getElementById("invalid-Mail").innerHTML = 'El mail que intenta ingresar ya existe'
                }


            } else {

                document.getElementById("txtmailCliente").className = "form-control is-valid";
            }

        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (document.getElementById("txtRutCliente").value == "") {
        document.getElementById("txtRutCliente").className = "form-control is-invalid";
        document.getElementById("invalid-Rut").innerHTML = 'Debe ingresar un RUT'
        val = 1;

    } else {
        if (!regexRut.test(document.getElementById("txtRutCliente").value)) {
            document.getElementById("txtRutCliente").className = "form-control is-invalid";
            document.getElementById("invalid-Rut").innerHTML = 'Considere el formato de un rut xxxxxxxx-x'
            val = 1;
        } else {
          
            if (respuestaRut.length != 0) {
            
                if (respuestaModificar.Rut_Cliente == respuestaRut[0].Rut_Cliente) {
                    document.getElementById("txtRutCliente").className = "form-control is-valid";
                } else {

                    val = 1;
                    document.getElementById("txtRutCliente").className = "form-control is-invalid";
                    document.getElementById("invalid-Rut").innerHTML = 'El rut que intenta ingresar ya existe'
                }
                   

                } else {

                    document.getElementById("txtRutCliente").className = "form-control is-valid";
                }

          
            

        }
    }

    return val
}





function removeModal() {
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}
function Select(id) {
    var url = "Cliente/DatosSession/?id=" + id;
    fetchget(url, function (res) {
        if (res.ID_Cliente == 0) {
            Error("No se encontro");
        } else {
            Correcto("Correcto");
          
            document.location.href = setUrl("Vehiculo/formularioAuto");
        }
    })
}



function ModificarUsu() {
    var frmR = document.getElementById("frmUsu");
    var frm = new FormData(frmR);
    if (validarUsu() == 0) {
   
            fetchPostText("Cliente/ModificarClienteUsu", frm, function (res) {
                if (res == "1") {
                    listarCliente();
                    /* LimpiarUsu();*/
                    Correcto("Se realizo exitosamente");
                    removeModal();
                    removeVal();

                } 
        })
    }
  
}

function validarUsu() {
    var val = 0;

    if (document.getElementById("txtUsu").value == "") {
        document.getElementById("txtUsu").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtUsu").className = "form-control is-valid";
    }

    if (document.getElementById("txtpassword").value == "") {
        document.getElementById("txtpassword").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtpassword").className = "form-control is-valid";
    }


    return val
}

function Limpiar() {

    LimpiarDatos("frmRCliente", "ID_Cliente", ["ID_Automotriz"]);
    DisplaybtnForm("btnAgregar", "");
    DisplaybtnForm("btnModificar", "none");
    removeVal();
    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}

function Editar(id) {


    recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRCliente", /*["FECHA_RECEPCION", "Trabajador"]*/);
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}

function EditarUsu(id) {


    recuperarGenerico("Cliente/RecuperarDatos/?id=" + id, "frmRCliente", /*["FECHA_RECEPCION", "Trabajador"]*/);
    recuperarU("Cliente/RecuperarDatos/?id=" + id, "frmUsu", /*["FECHA_RECEPCION", "Trabajador"]*/);
    

    DisplaybtnForm("btnAgregar", "none");
    DisplaybtnForm("btnModificar", "");
}


function recuperarU(url, idFormulario, excepciones = []) {
    var elementos = document.querySelectorAll("#" + idFormulario + " [name]");
    var nombreName;

    fetchget(url, function (res) {
        for (var i = 0; i < elementos.length; i++) {
            //Si esta incluido no se toma
            nombreName = elementos[i].name;
            console.log(nombreName)
            if (nombreName == "ID_ClienteU") {
                setN(nombreName, res["ID_Cliente"])
            } else {
                if (!excepciones.includes(elementos[i].name)) {
                    setN(nombreName, res[nombreName])
                }
            }
            

        }
    });
}

function LimpiarUsu() {

    LimpiarDatos("frmUsu", "", ["ID_ClienteU"]);
    removeVal();
    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}


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


function Eliminar(id) {
    fetchGetText("Cliente/EliminarCliente/?id=" + id, function (res) {
        if (res == "1") {
            listarCliente();
            Correcto("Se elimino Correctamente");
        } else {
            Error("Imposible eliminar debido a que sus datos estan en uso")
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

