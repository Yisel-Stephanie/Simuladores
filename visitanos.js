
//Creo una clase para las visitas
class Visitar {
    constructor(persona, dni, cliente, sucursal, asunto, fecha) {
        this.persona = persona;
        this.dni = dni;
        this.cliente = cliente;
        this.sucursal = sucursal;
        this.asunto = asunto;
        this.fecha = fecha;
    }
}
// Expresiones regulares para validar nombre y dni
const expresiones2 = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llelet acentos.       
    dni: /^\d{8}(?:[-\s]\d{4})?$/
}

//Modificio el input date porque quiero que mi cliente solo pueda sacar citas de "hoy" en adelante
let fecha = new Date();
anio = fecha.getFullYear();
dia = fecha.getDate();
mes = fecha.getMonth() + 1; // 8 agosto
mes = "0" + mes;// 0
document.getElementById("fecha").min = anio + '-' + mes + '-' + dia;

// llamados desde el html
let formVisita = document.getElementById('formVisita');
let btnVisitanos = document.getElementById('btnVisitanos');
let btnOtraCita = document.getElementById('btnOtraCita');
let tablaVisitas = document.getElementById('tablaVisitas');

//Array general vacio para guardar cada clase que voy creando
let todasLasVisitas = [];


//Btn que hace un "serialize" de los datos del formulario de cita
formVisita.addEventListener('submit', function (e) {
    e.preventDefault();
    let valores = new FormData(e.target);
    let cita = new Visitar(
        valores.get('persona'),
        valores.get('dni'),
        valores.get('cliente'),
        valores.get('sucursal'),
        valores.get('asunto'),
        valores.get('fecha')
    )
    //pusheo cada cita en un array general
    todasLasVisitas.push(cita);
    //limpio el formulario
    formVisita.reset();

    //almaceno las respuestas del form en variables separadas
    persona = valores.get('persona');
    dni = valores.get('dni');
    cliente = valores.get('cliente');
    sucursal = valores.get('sucursal');
    asunto = valores.get('asunto');
    fecha = valores.get('fecha');


    if (!expresiones2.nombre.test(persona)) {
        alert('Nombre incorrecto');
        return
    }
    if (!expresiones2.dni.test(dni)) {
        alert('Dni incorrecto');
        return
    }
    //me llevo al local storage el array que cree el cual nacio en mi clase "Visitar"
    localStorage.setItem('Visitar', JSON.stringify(todasLasVisitas));

    //Siguiente paso -rellenar tabla 
    mostrarCitas()
})

//Esta funcion sirve para rellanar una tablita que muesta la info de la cita
function mostrarCitas() {
    listaTablaVisitas = '';

    let tr = document.createElement('tr');
    listaTablaVisitas = listaTablaVisitas + `
             <td>`+ persona + `</td>
            <td>`+ dni + `</td>
            <td>`+ cliente + `</td>
            <td>`+ sucursal + `</td>
            <td>`+ asunto + `</td>
            <td>`+ fecha + `</td>      
            <button id="confirmarVisita">Confirmar</button>     
            `

    tablaCuerpo.appendChild(tr);
    tr.innerHTML = listaTablaVisitas;
    tablaVisitas.appendChild(tr);
    tablaVisitas.classList.remove('hidden');

    //deshabilito el boton al enviar el form 
    btnVisitanos.disabled = true;

    //tengo otro boton, por las dudas, si el usuario se equivoca y quiere agendar una cita con datos diferentes

    btnOtraCita.addEventListener('click', function () {
        tr.innerHTML = '';
        btnVisitanos.disabled = true;
        btnVisitanos.style.background = 'lightgray'

    })

    // cuando el usuario confirma la cita ...le digo que ...te espamos!
    let confirmarVisita = document.getElementById('confirmarVisita');


    confirmarVisita.addEventListener('click', function () {
        confirmarVisita.innerHTML = 'Te esperamos! <img src="https://img.icons8.com/color/30/000000/pay-date.png"/>'
    })
}



