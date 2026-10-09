const form = document.querySelector("#form-tareas");
const inputTitulo = document.querySelector("#titulo");
const inputCurso = document.querySelector("#curso");
const inputFecha = document.querySelector("#fecha-entrega");
const divAlertas = document.querySelector("#alertas");

const listaTareas= document.querySelector("#lista-tareas");

const btnTodas = document.querySelector("#btn-todas");
const btnPendientes= document.querySelector("#btn-pendientes");
const btnCompletadas= document.querySelector("#btn-completadas");


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtro = "Todas";
function renderizarTareas(){
    listaTareas.innerHTML = "";
    let tareasVisibles = tareas;
    if (filtro === "Pendientes"){
        tareasVisibles = tareas.filter((t) => !t.completada);
    }
    if (filtro === "Completadas"){
        tareasVisibles = tareas.filter((t)=> t.completada)
    }

    tareasVisibles.forEach((t) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.dataset.id = t.id;
               
        const span = document.createElement("span");
        span.textContent= `${t.titulo}  -  ${t.curso} (Entrega: ${t.fechaEntrega})`;
        span.classList.toggle("text-decoration-line-through", t.completada);
        
        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.textContent = "Eliminar";

        const btnCompletar = document.createElement("button");
        btnCompletar.type = "button";
        btnCompletar.className = "btn btn-success btn-sm me-2";
        btnCompletar.textContent = "Completar";

        li.appendChild(span);
        li.appendChild(btnCompletar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
}

function eliminarTarea (id) {
    tareas=tareas.filter(function(t){
        if (t.id !== id){
            return true;
        }
        else {
            return false;
        }
    });
    guardarTareas();
    renderizarTareas();
}

function completarTarea (id) {
    tareas=tareas.map(function(t) {
        if (t.id === id){
            t.completada = !t.completada;
        }
        return t;
    });
    guardarTareas();
    renderizarTareas();
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

listaTareas.addEventListener("click", (e) =>{
    const elemento= e.target;
    if (elemento.classList.contains("btn-danger")){
        const li= elemento.closest("li");
        const id = Number(li.dataset.id);
        eliminarTarea(id);
    }

    if (elemento.classList.contains("btn-success")){
        const li= elemento.closest("li");
        const id = Number(li.dataset.id);
        completarTarea(id);
    }
});

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
    guardarTareas();
    renderizarTareas();
    form.reset();

});

btnTodas.addEventListener("click", () => {
    filtro= "Todas";
    renderizarTareas();
});
btnPendientes.addEventListener("click", () => {
    filtro = "Pendientes";
    renderizarTareas();
});
btnCompletadas.addEventListener("click", () => {
    filtro = "Completadas";
    renderizarTareas();
});

document.addEventListener("DOMContentLoaded", renderizarTareas);