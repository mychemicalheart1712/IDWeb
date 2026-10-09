const form = document.querySelector("#form-tareas");
const inputTitulo = document.querySelector("#titulo");
const inputCurso = document.querySelector("#curso");
const inputFecha = document.querySelector("#fecha-entrega");
const divAlertas = document.querySelector("#alertas");

const listaTareas= document.querySelector("#lista-tareas");

const btnTodas = document.querySelector("#btn-todas");
const btnPendientes= document.querySelector("#btn-pendientes");
const btnCompletadas= document.querySelector("#btn-completadas");


let tareas = [];
function renderizarTareas(){
    listaTareas.innerHTML = "";

    tareas.forEach((t) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent= `${t.titulo}  -  ${t.curso} (Entrega: ${t.fechaEntrega})`;
        listaTareas.appendChild(li);
    });
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const titulo = inputTitulo.value.trim();
    const curso= inputCurso.value.trim();
    const fechaEntrega = inputFecha.value;
    if (titulo === "" || curso==="" || fechaEntrega ===""){
        divAlertas.innerHTML = '<div class="alert alert-danger">Todos los campos son obligatorios</div>';
        return;
    }

    const hoy = new Date();
    hoy.setHours(0,0,0,0);
    const fechaElegida = new Date(fechaEntrega + "T00:00:00");
    if (fechaElegida <= hoy){
        divAlertas.innerHTML = '<div class="alert alert-danger">La fecha de entrega debe ser posterior a hoy</div>';
        return;
    }
    divAlertas.innerHTML = "";

    const tarea = {
        id: Date.now(),
        titulo: titulo,
        curso: curso,
        fechaEntrega: fechaEntrega,
        completada: false
    };

    tareas.push(tarea);
    renderizarTareas();
    form.reset();

});


