let arrow = document.querySelectorAll(".arrow");
for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {//revisar linea de codigo, me imposibilita ejecutarlo en internet explored
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");


sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");

    let icono = document.getElementById("icono").className;
    if (icono == "bx bx-food-menu") {
        document.getElementById("icono").className = "bx bxs-food-menu";
    } else {
        document.getElementById("icono").className = "bx bx-food-menu";
    }
    
});
