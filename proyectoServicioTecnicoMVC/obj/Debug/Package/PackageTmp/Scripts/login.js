function Enviar() {
    var email = document.getElementById("Rec__Mail").value;
    

    if (document.getElementById('checkboxInput').checked) {
        var url = "EnviarMail/SendMailToAdm/?mail=" + email;
        if (validarRecuperar() == 0) {

            fetchget(url, function (res) {

                if (res == false) {
                    Error("No ha encontrado un usuario con el e-mail indicado")
                } else {

                    Correcto("Se ha enviado sus datos al e-mail ingresado");



                }
                


            })

        }


    } else {
        var url = "EnviarMail/SendMailToUser/?mail=" + email;
        if (validarRecuperar() == 0) {

            fetchget(url, function (res) {

                if (res == false) {
                    Error("Usuario no encontrado, revise e-mail")
                } else {

                    Correcto("Se han enviado sus datos");


                }



            })

        }



    }

}

function validarRecuperar(){
    val = 0;
    const mail = document.getElementById("Rec__Mail");

    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.value == "") {
        setErrorFor(mail, "Debe ingresar un e-mail")
        val = 1;

    } else {
        if (!regexMail.test(mail.value)) {
            setErrorFor(mail, "Debe considerar el formato de un Email")
            val = 1;
        } else {
           
                setSuccessFor(mail);

           
        }

    }

    return val;
}


function validarDatosL() {
    const mail = document.getElementById("login__username")
    const password = document.getElementById("login__password")

    var val = 0;


    if (password.value == "") {
        setErrorFor(password, "Debe ingresar una contraseña")
        val = 1;

    } else {
        setSuccessFor(password);
    }

   
    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.value == "") {
        setErrorFor(mail, "Debe ingresar un e-mail")
        val = 1;

    } else {
        if (!regexMail.test(mail.value)) {
            setErrorFor(mail, "Formato de e-mail incorrecto")
            val = 1;
        } else {
            setSuccessFor(mail);
            
        }

    }

    return val
}


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function Login() {
    var usuario = get("login__username")
    var contra = get("login__password");
  
    if (document.getElementById('checkboxInput').checked) {
        var url = "Login/loginAutomotriz/?mail=" + usuario + "&contra=" + contra;
        if (validarDatosL() == 0) {

            fetchget(url, function (res) {
                if (res.length != 0) {
                
                    if (res.ID_Automotriz == 0) {
                        Error("E-Mail o contraseña incorrecta")
                    } else {
                        if (document.getElementById("login__password").value != res.Clave_Web) {
                            Error("E-Mail o contraseña incorrecta")

                            fetchGetText("Login/InvalidSession", function (data) {
                            })
                        } else {
                            if (res.ID_Automotriz != 0) {
                                Correcto("Bienvenido");
                                document.location.href = setUrl("Automotriz/index")
                            } else {
                                Error("E-Mail o contraseña incorrecta")
                            }



                        }

                    }
                }
            })
        }
    } else {
        var url = "Login/loginCliente/?mail=" + usuario + "&contra=" + contra;

        if (validarDatosL() == 0) {

            fetchget(url, function (res) {
                if (res.length != 0) {
                    if (res.ID_Cliente == 0) {
                        Error("E-Mail o contraseña incorrecta")
                    } else {
                        if (document.getElementById("login__password").value != res.Clave_Cliente) {
                            Error("E-Mail o contraseña incorrecta")

                            fetchGetText("Login/InvalidSession", function (data) {
                            })
                        } else {
                            if (res.ID_Cliente != 0) {
                                Correcto("Bienvenido");
                                document.location.href = setUrl("WebsiteClient/AgendamientoHora")
                            } else {
                                Error("E-Mail o contraseña incorrecta")
                            }



                        }

                    }
                }
            })

        }
    }
}

var respuestaRut;
var respuestaMail;
function registar() {


    var mail = get("signUpEmail");
    var rut = get("signUpRUT");

    var url = "Login/filtrar/?rut=" + rut;
    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaRut = data)

    url = "Login/RecuperarClienteMail/?mail=" + mail;
    urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + url;

    fetch(urlAbsoluta)
        .then(res => res.json())
        .then(data => respuestaMail = data)



    delay(1000).then(() => GuardarDatosValidado());

}

function GuardarDatosValidado() {

    var usuario = get("signUpUsername");
    var contra = get("signUpPassword");
    var mail = get("signUpEmail");
    var rut = get("signUpRUT");

    var url = "Login/RegistrarClienteUsuario/?rut=" + rut + "&mail=" + mail + "&usuario=" + usuario + "&clave=" + contra;

    if (validarDatosR() == 0) {


        fetchget(url, function (res) {
            if (res == 0) {
                Error("Revise todos los datos que intenta ingresar")
            } else {
               
                Correcto("Registro Exitoso");
                document.location.href = setUrl("WebsiteClient/index")
            }


        })
    } 
  
}

function validarDatosR() {
    const usario = document.getElementById("signUpUsername")
    const password = document.getElementById("signUpPassword")
    const mail = document.getElementById("signUpEmail")
    const rut = document.getElementById("signUpRUT")
    var ConfirmPass = document.getElementById("signUpConfirmPassword")

    var val = 0;


    if (password.value == "") {
        setErrorFor(password, "Debe ingresar una contraseña")
        val = 1;

    } else {
        if (ConfirmPass.value != password.value) {
            setErrorFor(password, "Las contraseñas no coinciden")
            val = 1;
        } else {
            setSuccessFor(password);
        }
    }


    if (ConfirmPass.value == "") {
        setErrorFor(ConfirmPass, "Debe ingresar una contraseña")
        val = 1;

    } else {
        if (ConfirmPass.value != password.value) {
            setErrorFor(ConfirmPass, "Las contraseñas no coinciden")
            val = 1;
        } else {
            setSuccessFor(ConfirmPass);
        }
       
    }


    let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (mail.value == "") {
        setErrorFor(mail, "Debe ingresar un e-mail")
        val = 1;

    } else {
        if (!regexMail.test(mail.value)) {
            setErrorFor(mail, "Debe considerar el formato de un Email")
            val = 1;
        } else {
        
            if (respuestaMail.length != 0) {
                setErrorFor(mail, "El mail que intenta ingresar ya existe")
                val = 1;

            } else {
                setSuccessFor(mail);
            
            }
        }

    }

    let regexRut = new RegExp('^([0-9]{8})+-[0-9kK]{1}$');

    if (rut.value == "") {
        setErrorFor(rut, "Debe ingresar un RUT")
        val = 1;

    } else {
        if (!regexRut.test(rut.value)) {
            setErrorFor(rut, "Considere el formato de un rut xxxxxxxx-x")
            val = 1;
        } else {
            if (respuestaRut.length != 0) {
                val = 1;
                setErrorFor(rut, "El rut que intenta ingresar ya existe")
              

            } else {

                setSuccessFor(rut);
            }

        }
    }


    if (usario.value == "") {
        setErrorFor(usario, "Debe ingresar un usuario")
        val = 1;

    } else {
        setSuccessFor(usario);
    }



    return val
}


//var error = 0
//function Login() {
//    var usuario = getN("Mail_Automotriz");
//    var contra = getN("Clave_Web");

//    var url = "Login/loginAutomotriz/?mail=" + usuario + "&contra=" + contra;
//    var raiz = document.getElementById("hdfOculto").value;
//    var urlA = window.location.protocol + "//" + window.location.host + raiz + url;
//    url = "Login/loginCliente/?mail=" + usuario + "&contra=" + contra;
//    var urlC = window.location.protocol + "//" + window.location.host + raiz + url;
//    Promise.all([fetch(urlA), fetch(urlC)])
//        .then(results => Promise.all(results.map(r => r.json())))
//        .then(results => {

//            var res = results[0];
//            var resRE = results[1];
//            //console.log(res)
//            //console.log(resRE)
    

//            if (res.ID_Automotriz == 0 && resRE.ID_Cliente == 0) {
//                Error("E-Mail o contraseña incorrecta")
//            } else {
//                if (document.getElementById("login__password").value != res.Clave_Web && document.getElementById("login__password").value != resRE.Clave_Cliente) {
//                    Error("E-Mail o contraseña incorrecta")

//                    fetchGetText("Login/InvalidSession", function (data) {
//                    })
//                } else {
//                    if (res.ID_Automotriz != 0) {
//                        Correcto("Bienvenido");
//                        document.location.href = setUrl("Automotriz/index")
//                    } else if (resRE.ID_Cliente != 0) {
//                        Correcto("Bienvenido");
//                        document.location.href = setUrl("WebsiteClient/index")
//                    } else {
//                        Error("E-Mail o contraseña incorrecta")
//                    }
                   
              
                    
//                }

//            }
            

//        })

    
//}



//var error = 0;
//function Login() {

//    var usuario = getN("Mail_Automotriz");
//    var contra = getN("Clave_Web");
 
//    fetchget("Login/loginAutomotriz/?mail=" + usuario + "&contra=" + contra, function (data) {
//        if (data.ID_Automotriz == 0) {

//            this.error = 1;
//        } else {
//            if (document.getElementById("login__password").value != data.Clave_Web) {
//                this.error = 1;

//            } else {
//                this.error = 0;
//                Correcto("Bienvenido");
//                document.location.href = setUrl("Automotriz/index")
//            }

//        }
//    })

//    delay(1000).then(() => IngresarCliente());
//        delay(1500).then(() => invalidarSession());
   
//}

//function IngresarCliente() {
//    if (this.error == 1) {
//        var usuario = getN("Mail_Automotriz");
//        var contra = getN("Clave_Web");
//        fetchget("Login/loginCliente/?mail=" + usuario + "&contra=" + contra, function (data) {

//            if (data.ID_Cliente == 0) {
//                this.error = 1;

//            } else {
//                if (document.getElementById("login__password").value != data.Clave_Cliente) {
//                    this.error = 1;

//                } else {
//                    this.error = 0;
//                    Correcto("Bienvenido");
//                    document.location.href = setUrl("WebsiteClient/index")
//                }

//            }
//        })


//    }
//}


//function delay(time) {
//    return new Promise(resolve => setTimeout(resolve, time));
//}

//function invalidarSession() {
//    if (this.error = 1) {
//        Error("E-Mail o contraseña incorrecta")
//    fetchGetText("Login/InvalidSession", function (data) {
//    /*    console.log(data);*/
//    })
//    }
//}

// Hello Everyone.
// This Is A Simple App Login Sing Up From Validation.
// I Hope You Like It And i tried To Make The JavaScript Code simple 
// See You Guys In Next Project :)
// Thanks.

// - - - - -  Variables - - - - - //

// Wrapper Area
const wrapper__Area = document.querySelector('#wrapper_Area');

// Login & Sing-Up Forms
const loginForm = document.querySelector('#loginForm');
const signUpForm = document.querySelector('#signUpForm');

// All Login And Sing-Up Forms Inputs 
const allLoginFormFields = Array.from(document.querySelectorAll('#loginForm .input__group .field input'));
const allSignUpFormFields = Array.from(document.querySelectorAll('#signUpForm .input__group:not(.confirm__group) .field input'));

// Password And Confirm Password Fileds
const passwordField = document.querySelector('#signUpPassword');
const confirmPassword = document.querySelector('#signUpConfirmPassword');

// Login % Sign-Up Submit Buttons
const loginFormSubmitBtn = document.querySelector('#loginSubmitBtn');
const signUpFormSubmitBtn = document.querySelector('#signUpSubmitBtn');

// Show Hide Password Element
const showHidePassDom = Array.from(document.querySelectorAll('.showHide__Icon i'));

// Pattrens Regex
const patterns = { // All This Regex Code Is For Demo You Can Add Your Own Regex Code :)
    /* usuario: /^[a-z]+\d?/,*/
    usuario: /^(?!\s*$).+/,
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    contraseña: /^(?!\s*$).+/,
    /*contraseña: /^[^\d\W]\w+\d?\W?\w?/i,*/
};

// Aside Area
const aside__Area = document.querySelector('#aside_Area');

// Aside Sing-Up & Sign In Buttons
const aside__SignUp_Button = document.querySelector('#aside_signUp_Btn');
const aside__SignIn_Button = document.querySelector('#aside_signIn_Btn');

// - - - - -  Events - - - - - //

//// When Submitting On Login & Sign-Up Forms
//loginForm.addEventListener('submit', (e) => {
//    // Stop Form Submission
//    e.preventDefault();
//    // Call Login Form Validation Function
//    loginFormValidation();
//});
//signUpForm.addEventListener('submit', (e) => {
//    // Stop Form Submission
//    e.preventDefault();
//    // Call Sign-Up Form Validation Function
//    signUpFormValidation();
//});

// Every Time Click On Aside Sign-Up & Sing-In Buttons. Call Function Chnage Form Mode
aside__Area.addEventListener('click', chnageFormMode);
aside__Area.addEventListener('click', chnageFormMode);

// - - - - -  Functions - - - - - //

// Change Form Mode Function
function chnageFormMode(e) {
    // Check. If The Target Element Is Aside Sign-Up Button
    if (e.target === aside__SignUp_Button) {
        // Add Class [ Sign Up Mode Active ] On Wrapper Area
        wrapper__Area.classList.add('sign-up__Mode-active');
    };
    // Check. If The Target Element Is Aside Sign-In Button
    if (e.target === aside__SignIn_Button) {
        // Remove Class [ Sign Up Mode Active ] From Wrapper Area
        wrapper__Area.classList.remove('sign-up__Mode-active');
    };
};

// Function Show Hide Password
(function showHidePass() {
    // Loop On All The Show Hide Password Icon
    showHidePassDom.forEach(icon => {
        // When Click On Any Show Hide Icon...
        icon.addEventListener('click', () => {
            // Select The Target Password Input
            const targetAreaInput = icon.parentElement.parentElement.querySelector('.field input');
            // If The Target Icon Has Hide-icon
            if (icon.className === 'bx bx-hide') {
                // Change The Target Icon Class
                icon.className = 'bx bx-show';
                // Change The Target Input Area Type
                targetAreaInput.setAttribute('type', 'text');
            } else { // else
                // Change The Target Icon Class
                icon.className = 'bx bx-hide';
                // Change The Target Input Area Type
                targetAreaInput.setAttribute('type', 'password');
            };
        });
    });
})();

//// Login Form Validation Function
//function loginFormValidation() {
//    // Loop On All The Inputs
//    allLoginFormFields.forEach(input => {
//        // Input Targte Field Name Value
//        const inputAttribueValueName = input.attributes.name.value;
//        // Input Value Without Spaces
//        const inputValue = input.value.trim();
//        // Input Regex Validation Response [ True || False ] :)
//        const inputRegex = patterns[inputAttribueValueName].test(inputValue);

//        // Check If The Input Value Is Empty
//        if (inputValue === '') {
//            // Call Function Set Error For
//            setErrorFor(input, `El parametro es requrido. Porfavor ingreselo.`);
//          /*  setErrorFor(input, `${inputAttribueValueName} is required. Please enter your response.`);*/
//        } else if (inputRegex === false) { // Else If: If The InputRegext Response Is False
//            // Call Function Set Error For
//            setErrorFor(input, `Considere un formato valido.`);
//           /* setErrorFor(input, `${inputAttribueValueName} Is Invalid .`);*/
//        } else { // Else
//            // Call Function Set Success For
//            setSuccessFor(input);
//        };
//    });
//};

//// Sign-Up Form Validation Function
//function signUpFormValidation() {
//    // Loop On All The Inputs
//    allSignUpFormFields.forEach(input => {
//        // Password And Confirm Password Fileds Values Without Spaces
//        const passwordFieldValue = passwordField.value.trim();
//        const conifrmPassValue = confirmPassword.value.trim();
//        // Input Targte Field Name Value
//        const inputAttribueValueName = input.attributes.name.value;
//        // Input Value Without Spaces
//        const inputValue = input.value.trim();
//        // Input Regex Validation Response [ True || False ] :)
//        const inputRegex = patterns[inputAttribueValueName].test(inputValue);

//        // Check If The Input Value Is Empty
//        if (inputValue === '') {
//            // Call Function Set Error For
//            setErrorFor(input, `El parametro es requrido. Porfavor ingreselo.`);
//        } else if (inputRegex === false) { // Else If: If The InputRegext Response Is False
//            // Call Function Set Error For
//            setErrorFor(input, `Considere un formato valido.`);
//        } else { // Else
//            // Call Function Set Success For
//            setSuccessFor(input);
//        };

//        // Validation The Confirm Password
//        if (conifrmPassValue === '') { // Check If The Confirm Password Value Is Empty
//            // Call Function Set Error For
//            setErrorFor(confirmPassword, `Confirm password is required. Please enter your response.`);
//        } else if (conifrmPassValue !== passwordFieldValue) { // Check If The Confirm Password Value Is Dose Not Match The Password Filed
//            // Call Function Set Error For
//            setErrorFor(confirmPassword, `Confirm password does not match`);
//        } else { // Eles
//            // Call Function Set Success For
//            setSuccessFor(confirmPassword);
//        };

//    });
//};

// Set Error For Function
function setErrorFor(input, message) {
    // Select The Target Parent Target Input Group
    const targetParentInput = input.parentElement.parentElement;
    // Select The Target Input Error Message
    const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

    // Remove Class FormSucess From The Parent Target
    targetParentInput.classList.remove('formSuccess');
    // Add Class Success On Target ParentElement
    targetParentInput.classList.add('formError');
    // Set The Message Inside The Target Error Message
    targetErrorMessage.innerHTML = message;
};

// Set Success For Function
function setSuccessFor(input) {
    // Select The Target Parent Target Input Group
    const targetParentInput = input.parentElement.parentElement;
    // Select The Target Input Error Message
    const targetErrorMessage = targetParentInput.querySelector('.input__error_message');

    // Remove Class FormError From The Parent Target
    targetParentInput.classList.remove('formError');
    // Add Class Success On Target ParentElement
    targetParentInput.classList.add('formSuccess');
    // Empty The Error Message
    targetErrorMessage.innerHTML = '';
};