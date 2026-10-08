const form = document.querySelector("#form-tareas");
const inputTitulo = document.querySelector("#titulo");
const inputCurso = document.querySelector("#curso");
const inputFecha = document.querySelector("#fecha-entrega");
const divAlertas = document.querySelector("#alertas");

const listaTareas= document.querySelector("#lista-tareas");

const btnTodas = document.querySelector("#btn-todas");
const btnPendientes= document.querySelector("#btn-pendientes");
const btnCompletadas= document.querySelector("#btn-completadas");

//arreglo de tareas
let tareas = [];
console.log(form, inputTitulo, inputCurso, inputFecha, divAlertas, listaTareas, btnTodas, btnPendientes, btnCompletadas, tareas);