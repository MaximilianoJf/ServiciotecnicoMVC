window.onload = function () {

}



$(function () {

    // Menu Tabular
    var $menu_tabs = $('.menu__tabs li a');
    $menu_tabs.on('click', function (e) {
        e.preventDefault();
        $menu_tabs.removeClass('active');
        $(this).addClass('active');

        $('.menu__item').fadeOut(300);
        $(this.hash).delay(300).fadeIn();
    });

});


const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#txtpassword");

togglePassword.addEventListener("click", function () {
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    this.classList.toggle("bi-eye");
});


function CerrarSession() {

    document.location.href = setUrl("Login/CerrarSesionCliente");
}


function removeModal() {
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}

function removeVal() {
    $('input').removeClass('is-valid');
    $('input').removeClass('is-invalid');
}


var respuestaRut;
var respuestaMail;
var respuestaModificar;
function ModificarDatos() {
    var rut = document.getElementById("txtRutCliente").value;
    var mail = document.getElementById("txtmailCliente").value;

    var url = "WebsiteClient/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)


    var id = document.getElementById("txtidCliente").value;
    url = "WebsiteClient/RecuperarDatos/?id=" + id;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaModificar = data)


    url = "WebsiteClient/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)


    delay(1500).then(() => ModificarDatosValidado());

}

function ModificarDatosValidado() {
    var frmR = document.getElementById("frmR");
    var frm = new FormData(frmR);
    //console.log(respuestaModificar.Rut_Cliente)
    //console.log(respuestaRut[0].Rut_Cliente)

    if (validarDatosM() == 0) {
        fetchPostText("WebsiteClient/GuardarDatos", frm, function (res) {

            if (res == "1") {
                removeModal()
                removeVal();
                Correcto("Se realizo exitosamente");
                document.location.href = setUrl("WebsiteClient/index")
            } else {
                Error("Revise todos los datos que intenta ingresar")
            }
        })
    }
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




function Limpiar() {

    LimpiarDatos("frmR", "ID_Cliente", ["ID_Automotriz"]);
    removeVal();
    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}

function Editar(id) {


    recuperarGenerico("WebsiteClient/RecuperarDatos/?id=" + id, "frmR", /*["FECHA_RECEPCION", "Trabajador"]*/);
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}



function DisplaybtnForm(idBtn, mostrar) {
    const button = document.querySelector('#' + idBtn);
    button.style.display = mostrar;
}

