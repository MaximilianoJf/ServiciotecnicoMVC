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

    document.location.href = setUrl("Login/CerrarSesionAutomotriz");
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


function validarDatos() {
    var val = 0;

    if (document.getElementById("txtNombre").value == "") {
        document.getElementById("txtNombre").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtNombre").className = "form-control is-valid";
    }

    if (document.getElementById("txtCiudad").value == "") {
        document.getElementById("txtCiudad").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtCiudad").className = "form-control is-valid";
    }

    if (document.getElementById("txttelefono").value == "") {
        document.getElementById("txttelefono").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txttelefono").className = "form-control is-valid";
    }


    if (document.getElementById("txtDireccion").value == "") {
        document.getElementById("txtDireccion").className = "form-control is-invalid";
        val = 1;

    } else {
        document.getElementById("txtDireccion").className = "form-control is-valid";
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

    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (document.getElementById("txtmail").value == "") {
        document.getElementById("txtmail").className = "form-control is-invalid";
        document.getElementById("invalid-Mail").innerHTML = 'Debe ingresar un e-mail'
        val = 1;

    } else {
        if (!regexMail.test(document.getElementById("txtmail").value)) {
            document.getElementById("txtmail").className = "form-control is-invalid";
            document.getElementById("invalid-Mail").innerHTML = 'Debe considerar el formato de un Email'
            val = 1;
        } else {
            document.getElementById("txtmail").className = "form-control is-valid";
        }

    }




    return val
}

function GuardarDatos() {
    var frmR = document.getElementById("frmR");
    var frm = new FormData(frmR);


    if (validarDatos() == 0) {
        fetchPostText("Automotriz/GuardarDatos", frm, function (res) {

            if (res == "1") {
                removeModal()
                removeVal();
                Correcto("Se realizo exitosamente");
                document.location.href = setUrl("Automotriz/index")
            } else {
                Error("Revise todos los datos que intenta ingresar")
            }
        })
    }
}



function removeModal() {
    $("#exampleModal").modal('hide');//ocultamos el modal
    $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
    $('.modal-backdrop').remove();//eliminamos el backdrop del modal
}




function Limpiar() {

    LimpiarDatos("frmR", "ID_Automotriz", ["ID_Automotriz"]);
    removeVal();
    /* DesbloquearInput("frmRecepción", ["ID_Cliente","ID_Automotriz"])*/

}

function Editar(id) {


    recuperarGenerico("Automotriz/RecuperarDatos/?id=" + id, "frmR", /*["FECHA_RECEPCION", "Trabajador"]*/);
    /*DesbloquearInput("frmRecepción", ["ID_Cliente", "ID_Automotriz"])*/
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
