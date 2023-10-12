window.onload = function () {
    setActualDay();
    listar();
  
}

var diaSelect = "";


function setActualDay() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var todayDate = String(date.getDate()).padStart(2, '0');
    var datePattern = year + '-' + month + '-' + todayDate;
    document.getElementById("txtfechaRecepcion").value = datePattern;
}

function setDay(dia) {
    


    var date = dia;
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var todayDate = String(date.getDate()).padStart(2, '0');
    var datePattern = year + '-' + month + '-' + todayDate;
    document.getElementById("txtfechaRecepcion").value = datePattern;

}

function listar(dia = "") {
    var diaActual = new Date()
  
    var days = new Array(7);
    days[0] = "Domingo";
    days[1] = "Lunes";
    days[2] = "Martes";
    days[3] = "Miercoles";
    days[4] = "Jueves";
    days[5] = "Viernes";
    days[6] = "Sabado";
    diaAD = days[diaActual.getDay()]
    

    if (dia == "") {
            dia = diaAD;
    } else {

            dia = diaSelect
    }

 

    pintarHorario({
        url: "HorarioAtencion/ListarHorarioDia/?dia=" + dia,
        id: "divTabla",
        cabeceras: [/*"ID", *//*"Dia",*/ "Hora Inicio", "Hora Fin"],
        colspan: 2,
        subtabla: false,
        colspanSub: 3,
        propiedades: [/*"ID_Marca",*/ /*"Dia_Semanal", */"Hora_Inicio", "Hora_Fin"],
        check: true,
        editar: false,
        propiedadId: "ID_Horario"
    }, {
        
    })
}

const CONSTANTS = {
    DOM_SELECTORS: {
        datePicker: "",
        datePickerPrevMonth: ".date_picker_prev_month",
        datePickerNextMonth: ".date_picker_next_month",
        datePickerMonthDays: ".date_picker_month_days",
        datePickerMonthDay: ".date_picker_month_day",
        datePickerYear: ".date_picker_year",
        datePickerMonthName: ".date_picker_month_name",
        datePickerDay: ".day"
    },
    DOM_STRINGS: {
        dataTime: "li[data-time]"
    },
    DUMMY_LI_FOR_EMPTY_DAYS: '<li class="day"></li>',
    DAY_MAP: {
        0: "Domingo",
        1: "Lunes",
        2: "Martes",
        3: "Miercoles",
        4: "Jueves",
        5: "Viernes",
        6: "Sabado"
    },
    MONTH_MAP: {
        0: "Enero",
        1: "Febrero",
        2: "Marzo",
        3: "Abril",
        4: "Mayo",
        5: "Junio",
        6: "Julio",
        7: "Agosto",
        8: "Septiembre",
        9: "Octubre",
        10: "Noviembre",
        11: "Diciembre"
    }
};

const utils = (function () {
    function prefixDOMSelectorsWithPickerSelector(pickerSelector) {
        let DOM_SELECTORS = {};
        for (let selector in CONSTANTS.DOM_SELECTORS) {
            DOM_SELECTORS[
                selector
            ] = `${pickerSelector} ${CONSTANTS.DOM_SELECTORS[selector]}`.trim();
        }
        CONSTANTS.DOM_SELECTORS = DOM_SELECTORS;
    }

    function getDOMElements(DOMSelectors) {
        let DOMElements = {};
        for (let selector in DOMSelectors) {
            if (DOMSelectors.hasOwnProperty(selector)) {
                DOMElements[selector] = document.querySelector(DOMSelectors[selector]);
            }
        }
        return DOMElements;
    }

    function getDatePickerWeekDaysNameMarkUp() {
        return `
        <li>Dom</li>
        <li>Lun</li>
        <li>Mar</li>
        <li>Mie</li>
        <li>Jue</li>
        <li>Vie</li>
        <li>Sat</li>`;
    }

    function getDayMarkup(day = 1, isActive = false, time = null) {
        if (!time) {
            console.trace(`The time provided for getDayMarkup ${time} is invalid`);
        }
        return `
        <li class="day" data-time="${time}">
            <button class="${isActive ? "active" : ""}">${day}</button>
        </li>`;
    }

    function getAllDays() {
        let days = document.querySelectorAll(CONSTANTS.DOM_SELECTORS.datePickerDay);
        return [...(days ?? [])];
    }

    function getDaySuffix(day) {
        switch (day) {
            case 1:
            case 21:
            case 31:
                return ""
               /* return "st";*/
            case 2:
            case 22:
                return ""
               /* return "nd";*/
            case 3:
            case 23:
                return ""
                /*return "rd";*/
            default:
                return ""
                /*return "th";*/
        }
    }

    return {
        prefixDOMSelectorsWithPickerSelector,
        getDOMElements,
        getDatePickerWeekDaysNameMarkUp,
        getDayMarkup,
        getAllDays,
        getDaySuffix
    };
})();

const model = (function () {
    const data = {
        currentDate: new Date(),
        selectedDate: new Date()
    };

    function setCurrentDate(newDate) {
        data.currentDate = newDate;
    }

    function setSelectedDate(newDate) {
        data.selectedDate = newDate;
    }

    function getCurrentDate() {
        return data.currentDate;
    }

    function getSelectedDate() {
        return data.selectedDate;
    }

    return { setCurrentDate, setSelectedDate, getCurrentDate, getSelectedDate };
})();

const view = (function (model, utils) {
    function removeDays() {
        const allDays = utils.getAllDays();
        allDays.forEach((day) => day.remove());
    }

    function fillEmptyDays(count) {
        const DOMElements = utils.getDOMElements(CONSTANTS.DOM_SELECTORS);
        for (let i = 0; i < count; i++) {
            DOMElements.datePickerMonthDays.insertAdjacentHTML(
                "beforeend",
                CONSTANTS.DUMMY_LI_FOR_EMPTY_DAYS
            );
        }
    }

    function fillDay(day, isActive = false, time) {
        const dayMarkUp = utils.getDayMarkup(day, isActive, time);
        const DOMElements = utils.getDOMElements(CONSTANTS.DOM_SELECTORS);
        DOMElements.datePickerMonthDays.insertAdjacentHTML("beforeend", dayMarkUp);
    }

    function fillCurrentMonth(string) {
        const DOMElements = utils.getDOMElements(CONSTANTS.DOM_SELECTORS);
        DOMElements.datePickerMonthName.textContent = string;
    }

    function fillSelectedDate(month, date, day, year) {
        const DOMElements = utils.getDOMElements(CONSTANTS.DOM_SELECTORS);
        DOMElements.datePickerMonthDay.innerHTML = `${CONSTANTS.MONTH_MAP[month]
            } ${date}<sup>${utils.getDaySuffix(date)}</sup>, ${CONSTANTS.DAY_MAP[day]}`;
        DOMElements.datePickerYear.textContent = year;
    }

    return {
        removeDays,
        fillEmptyDays,
        fillDay,
        fillCurrentMonth,
        fillSelectedDate
    };
})(model, utils);

const controller = (function (model, view, utils) {
    let DOMElements = null;
    function init(pickerSelector = "", selectedDate = new Date()) {
        utils.prefixDOMSelectorsWithPickerSelector(pickerSelector);
        DOMElements = utils.getDOMElements(CONSTANTS.DOM_SELECTORS);
        if (!DOMElements.datePicker) {
            throw new Error(
                `Date Picker with selector ${pickerSelector} not found in the document`
            );
        }
        DOMElements.datePickerNextMonth.addEventListener(
            "click",
            handleNextMonthClick
        );
        DOMElements.datePickerPrevMonth.addEventListener(
            "click",
            handlePrevMonthClick
        );
        DOMElements.datePickerMonthDays.addEventListener("click", handleSelectDate);
        if (selectedDate.constructor !== Date) {
            throw new Error(`The initial date ${selectedDate} is not a Date Object`);
        }
       
        let clonedSelectedDate = new Date(selectedDate.getTime());
        let clonedCurrentDate = new Date(selectedDate.getTime());
        model.setSelectedDate(clonedSelectedDate);
        model.setCurrentDate(clonedCurrentDate);
        render(selectedDate);
    }

    function handleSelectDate(event) {
        const time = event.target.closest(CONSTANTS.DOM_STRINGS.dataTime)?.dataset
            .time;
        if (!time) return;
        model.setSelectedDate(new Date(Number(time)));
        model.setCurrentDate(new Date(Number(time)));
        var a = new Date(Number(time))

        var days = new Array(7);
        days[0] = "Domingo";
        days[1] = "Lunes";
        days[2] = "Martes";
        days[3] = "Miercoles";
        days[4] = "Jueves";
        days[5] = "Viernes";
        days[6] = "Sabado";
        diaSelect = days[a.getDay()];
        setDay(a)
        listar(diaSelect)
   
        render();
    }

    






    function handleNextMonthClick() {
        render();
    }

    function handlePrevMonthClick() {
        let currentDate = new Date(model.getCurrentDate().getTime());
        currentDate.setMonth(currentDate.getMonth() - 2);
        model.setCurrentDate(currentDate);
        render();
    }

    function render(selectedDate = null) {
        updateSelectedDateMarkUp();
        view.removeDays();
        let currentDate = new Date(
            selectedDate?.getTime() ?? model.getCurrentDate().getTime()
        );
        let selected = model.getSelectedDate();
        let selectedDay = selected.getDate();
        let selectedMonth = selected.getMonth();
        let selectedYear = selected.getFullYear();
        currentDate.setDate(1);
        let renderingMonth = currentDate.getMonth();
        view.fillEmptyDays(currentDate.getDay());
        view.fillCurrentMonth(
            `${CONSTANTS.MONTH_MAP[renderingMonth]} - ${currentDate.getFullYear()}`
        );
        while (currentDate.getMonth() === renderingMonth) {
            let currentMonth = currentDate.getMonth();
            let currentDay = currentDate.getDate();
            let currentYear = currentDate.getFullYear();
            let currentStringDate = `${currentDay}/${currentMonth + 1
                }/${currentYear}`;
            let selectedStringDate = `${selectedDay}/${selectedMonth + 1
                }/${selectedYear}`;
            view.fillDay(
                currentDate.getDate(),
                selectedStringDate === currentStringDate,
                currentDate.getTime()
            );
            currentDate.setDate(currentDay + 1);
        }
        model.setCurrentDate(currentDate);
    }

    function updateSelectedDateMarkUp() {
        const currentDate = new Date(model.getSelectedDate().getTime());
        view.fillSelectedDate(
            currentDate.getMonth(),
            currentDate.getDate(),
            currentDate.getDay(),
            currentDate.getFullYear()
        );
    }

    return { init };
})(model, view, utils);

controller.init("#date_picker_1");



function seleccionar(id) {
    var idC = document.getElementById("txtidCliente").value;
    var fecha = document.getElementById("txtfechaRecepcion").value;

    var url = "WebsiteClient/guardarAgendamiento/?id=0" + "&idC=" + idC + "&idH=" + id + "&fecha=" + fecha;

    var urlV = "WebsiteClient/Recuperarsolicitudcliente/?id=" + idC;


    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var todayDate = String(date.getDate()).padStart(2, '0');
    var datePattern = year + '-' + month + '-' + todayDate;

    if (get("txtFono") == 0 || get("txtDireccion") == "sin especificar" || get("txtNombre") == "sin especificar") {
        ConfimacionModificar("Debe rellenar todos sus datos para agendar una hora, ¿Desea ir a modificar sus datos?", "Error", function (rpta) {

        });
    }else if (fecha < datePattern) {
        console.log("sadsd")
        Error("No puede solicitar una fecha ya transcurrida")
    } else {
        fetchget(urlV, function (resV) {

            var encontrado = 0;
            for (var j = 0; j < resV.length; j++) {
                if (resV[j].Estado == 1) {
                    encontrado = 1;
                    break;
                }
            }

            if (resV.length == 0 || encontrado == 0) {


                fetchget(url, function (res) {

                    Correcto("Correcto");
                    document.location.href = setUrl("WebsiteClient/Solicitud");

                })

            } else {

                Confimacion("Usted ya tiene una hora agendada, ¿Desea ir a verla?", "Error", function (rpta) {

                });

            }
        })
    }

    


   


}

function ConfimacionModificar(texto = "Debe rellenar todos sus datos para agendar una hora, ¿Desea ir a modificar sus datos?", tittle = "Confirmación", callback) {
    return Swal.fire({
        title: tittle,
        text: texto,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            document.location.href = setUrl("WebsiteClient/Index");
        }
    })
}

function Confimacion(texto = "Usted ya tiene una hora agendada, ¿Desea ir a verla?", tittle = "Confirmación", callback) {
    return Swal.fire({
        title: tittle,
        text: texto,
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            document.location.href = setUrl("WebsiteClient/Solicitud");
        }
    })
}


var objConfiguracionGlobal;
var objBusquedaGLobal;
var idSub;

function pintarHorario(objConfiguracion, objBusqueda) {

    //url absoluta
    var fecha = document.getElementById("txtfechaRecepcion").value;



    var raiz = document.getElementById("hdfOculto").value;
    var urlAbsoluta = window.location.protocol + "//" + window.location.host + raiz + objConfiguracion.url;
    var urlAbsolutaRE = window.location.protocol + "//" + window.location.host + raiz + "WebsiteClient/ListarSolicitudFecha/?fecha=" + fecha;

    Promise.all([fetch(urlAbsoluta), fetch(urlAbsolutaRE)])
        .then(results => Promise.all(results.map(r => r.json())))
        .then(results => {

            var res = results[0];
            var resRE = results[1];
            var contenido = "";

            if (objConfiguracion.id == undefined) {
                objConfiguracion.id = "divTabla";
            }
            if (objConfiguracion.editar == undefined) {
                objConfiguracion.editar = false;
            }
            if (objConfiguracion.eliminar == undefined) {
                objConfiguracion.eliminar = false;
            }
            if (objConfiguracion.seleccionar == undefined) {
                objConfiguracion.seleccionar = false;
            }
            if (objConfiguracion.popup == undefined) {
                objConfiguracion.popup = false;
            }
            if (objConfiguracion.SelectName == undefined) {
                objConfiguracion.SelectName = "Seleccionar";
            }
            if (objConfiguracion.formulario == undefined) {
                objConfiguracion.formulario = false;
            }
            if (objConfiguracion.formularioB == undefined) {
                objConfiguracion.formularioB = false;
            }
            if (objConfiguracion.formularioE == undefined) {
                objConfiguracion.formularioE = false;
            }
            if (objConfiguracion.verDocumento == undefined) {
                objConfiguracion.verDocumento = false;
            }
            if (objConfiguracion.EliminarModal == undefined) {
                objConfiguracion.EliminarModal = false;
            }
            if (objConfiguracion.ModificarModal == undefined) {
                objConfiguracion.ModificarModal = false;
            }
            if (objConfiguracion.check == undefined) {
                objConfiguracion.check == false
            }


            if (objBusqueda != undefined && objBusqueda.busqueda == true) {
                if (objBusqueda.placeholder == undefined) {
                    objBusqueda.placeholder = "Ingrese un valor";
                }
                if (objBusqueda.id == undefined) {
                    objBusqueda.id = "txtbusqueda";
                }
                if (objBusqueda.type == undefined) {
                    objBusqueda.type = "text";
                }
                if (objBusqueda.cantB == undefined) {
                    objBusqueda.cantB == false;
                }
                if (objBusqueda.maxlength == undefined) {
                    objBusqueda.maxlength == 50;
                }
                if (objBusqueda.funcion == undefined) {
                    objBusqueda.funcion = "onkeyup"
                }
                if (objBusqueda.txtBuscar == undefined) {
                    objBusqueda.txtBuscar = "Buscar"
                }


                //asignar valores
                objConfiguracionGlobal = objConfiguracion;
                objBusquedaGLobal = objBusqueda;


                contenido += `<div class="seccionBusqueda">`;
                contenido += `
                    <p class=textBusqueda>${objBusqueda.txtBuscar}</p>
                    <div class="search">
                        <i id="search-icon" class='bx bx-search-alt'></i>
                        <input id="${objBusqueda.id}" placeholder="${objBusqueda.placeholder}" maxlength="${objBusqueda.maxlength}" ${objBusqueda.funcion}="buscar()" class="casillaB" type="${objBusqueda.type}">
                    </div>`
                contenido += `</div>`



            }
            contenido += "<div id='divContenedor' class='divContenedor'>";
            contenido += generarTablaHorario(objConfiguracion, res, resRE)
            contenido += "</div>";
            document.getElementById(objConfiguracion.id).innerHTML = contenido;


        })
}

function generarTablaHorario(objConfiguracion, res, resRE) {
    var contenido = "";
    contenido += "<div class='scroll-window-wrapper'>";
    contenido += "<div class='scroll-window'>";
    contenido += "<table class='table table-striped table-hover user-list fixed-header'>";
    contenido += "<thead>";
    for (var j = 0; j < objConfiguracion.cabeceras.length; j++) {
        contenido += "<th><div>" + objConfiguracion.cabeceras[j] + "</div></th>";
    }
    if (objConfiguracion.check == true || objConfiguracion.formularioE == true || objConfiguracion.subtabla == true || objConfiguracion.editar == true || objConfiguracion.eliminar == true || objConfiguracion.seleccionar == true || objConfiguracion.auto == true || objConfiguracion.subtabla == true || objConfiguracion.usuario == true) {
        contenido += `<th><div></div></th>`
    }

    contenido += "<tbody>";
    var fila;
    var propiedadActual;
    for (var i = 0; i < res.length; i++) {
        //fila = res[i]

        //contenido += `<tr colspan='` + objConfiguracion.colspan + `'>`;
        //for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
        //    propiedadActual = objConfiguracion.propiedades[j]
        //    switch (propiedadActual) {
        //        case "Valor":
        //            contenido += "<td>$" + fila[propiedadActual] + "</td>";
        //            break;
        //        case "Estado":
        //            if (fila[propiedadActual] != 0) {
        //                contenido += "<td>Vigente</td>";
        //            } else {
        //                contenido += "<td>Cancelada</td>";
        //            }

        //            break;
        //        default:
        //            contenido += "<td>" + fila[propiedadActual] + "</td>";
        //            break;
        //    }

        //}

        fila = res[i]
        var contiene = 0;
        for (var x = 0; x < resRE.length; x++) {
            filaRE = resRE[x]
            if (fila["ID_Horario"] == filaRE["ID_Horario"] && filaRE["Estado"] == 1) {
                contiene = 1;
                break;
            }
        }
        if (contiene != 1) {
             contenido += `<tr colspan='` + objConfiguracion.colspan + `'>`;

         for (var j = 0; j < objConfiguracion.propiedades.length; j++) {
                            propiedadActual = objConfiguracion.propiedades[j]
                            contenido += "<td>" + fila[propiedadActual] + "</td>";
            }

            if (objConfiguracion.check == true || objConfiguracion.check == true || objConfiguracion.ModificarModal == true || objConfiguracion.auto == true || objConfiguracion.subtabla == true || objConfiguracion.usuario == true || objConfiguracion.eliminar == true || objConfiguracion.editar == true || objConfiguracion.seleccionar == true || objConfiguracion.formularioE == true) {
                contenido += "<td>";
                if (objConfiguracion.editar == true) {
                    if (objConfiguracion.popup == true) {
                        contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar' data-toggle="modal" data-target="#${objConfiguracion.idPopup}"><i class="fa-solid fa-pen-to-square"></i></button>`;
                    } else {
                        contenido += `<Button type="button" onclick='Editar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar'><i class="fa-solid fa-pen-to-square"></i></button>`;
                    }

                }

                if (objConfiguracion.eliminar == true) {
                    contenido += `<Button type="button" onclick='Eliminar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Eliminar'><i class="fa-solid fa-trash-can"></i></button>`;
                }
                if (objConfiguracion.subtabla == true) {
                    contenido += `<button type="button" class='btn btn-info' onclick='mostrarSubTabla(${i})'><i id='icon-` + i + `' class='bx bx-chevron-down'></i>`;
                }
                if (objConfiguracion.seleccionar == true) {
                    contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver más'> ${objConfiguracion.SelectName}</button>`;
                }

                if (objConfiguracion.usuario == true) {
                    contenido += `<Button type="button" onclick='EditarUsu(${fila[objConfiguracion.propiedadId]})' class='btn btn-info'  title='Agregar Usuario' data-toggle="modal" data-target="#${objConfiguracion.idPopup}"><i style="font-size:22px;" class='bx bxs-user-plus' ></i></button>`;
                }
                if (objConfiguracion.auto == true) {
                    contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver autos' ><i class='bx bxs-car-mechanic'></i></button>`;
                }
                if (objConfiguracion.formulario == true) {

                    /*   contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Agregar documento'><i class='bx bx-file' ></i></button>`;*/
                    contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Agregar documento'><i class="fa-solid fa-file-circle-plus"></i></button>`;

                }
                if (objConfiguracion.formularioB == true) {
                    contenido += `<Button type="button" onclick='SelectB(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documentos'><i style="font-size:20px; margin-top:2px;" class='bx bxs-file-find'></i></button>`;
                    /*          contenido += `<Button type="button" onclick='SelectB(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documentos'><i class='bx bx-file-find' ></i></button>`;*/
                }
                if (objConfiguracion.formularioE == true) {
                    contenido += `<Button type="button" onclick='Select(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Editar documento'><i style="font-size:16px; margin-top:2px;" class='fa-solid fa-file-pen'></i></button>`;

                }
                if (objConfiguracion.verDocumento == true) {
                    contenido += `<Button type="button" onclick='Ver(${fila[objConfiguracion.propiedadId]})' class='btn btn-info select' title='Ver documento'><i style="font-size:16px; margin-top:2px;" class='fa-regular fa-eye'></i></button>`;

                }
                if (objConfiguracion.EliminarModal == true) {
                    contenido += `<Button type="button" onclick='EliminarModal(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Eliminar'><i class="fa-solid fa-trash-can"></i></button>`;

                }
                if (objConfiguracion.ModificarModal == true) {
                    contenido += `<Button type="button" onclick='ModificarModal(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Modificar'><i class="fa-solid fa-pen-to-square"></i></button>`;
                }
                if (objConfiguracion.check == true) {
                    contenido += `<Button type="button" onclick='seleccionar(${fila[objConfiguracion.propiedadId]})' class='btn btn-info' title='Seleccionar'><i class="fa-solid fa-check"></i></button>`;
                }


                contenido += "</td>";
                contenido += "</tr>";




                contenido += "</td>";
                contenido += "</tr>";
                contenido += "<tr id='display-" + i + "' class='hideTable'>";
                contenido += `<td colspan='` + objConfiguracion.colspanSub + `'>`;
                contenido += "<div>";
                contenido += "<table class='subTable'>";
                contenido += "<th>ID</th>";
                contenido += "<th>Modelo</th>";
                contenido += "<tr>";
                contenido += "<td>1</td>";
                contenido += "<td>Camaro</td>";
                contenido += "</tr>";
                contenido += "<tr>";
                contenido += "<td>2</td>";
                contenido += "<td>Aveo</td>";
                contenido += "</tr>";
                contenido += "</table>";
                contenido += "</div>";
                contenido += "</td>";
                contenido += "</tr>";

          







            } else {
                /* contenido += "</tr>";*/
                contenido += "</tr>";

                contenido += "</td>";
                contenido += "</tr>";
                contenido += "<tr id='display-" + i + "' class='hideTable'>";

            }

        }


       
       
        

        

    }
    contenido += "</tbody>";
    contenido += "</table>";
    contenido += "</div>";
    contenido += "</div>";
    return contenido;
}