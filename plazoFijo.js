
// Llamados desde el html
let formularioValidacion = document.getElementById('formularioValidacion');
let inputs = document.querySelectorAll('#formularioValidacion input');
let btnform = document.getElementById('btnForm');
let bienvenida = document.getElementById('bienvenida');
let tarjetas = document.getElementById('tarjetas');

//Algunas expresiones regulaes para validar los inputs del simulador de plazo fijo
const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.       
    dinero: /^\d{4,6}/ // 4 a 6 numeros.
}

//Validacion de los inputs, si todo esta ok.. continuara el programa y guardara en el local storage 
function validacionesIniciales() {
    //CAPTURAR LOS INPUTS DEL FORMULARIO DE VALIDACION INICIAL:

    nombre = document.getElementById('nombre').value;
    edad = document.getElementById('edad').value;
    cantidadDinero = parseInt(document.getElementById('cantidadDinero').value);

    //Valida nombre:

    if (!expresiones.nombre.test(nombre)) {
        alert('Nombre incorrecto');
        formularioValidacion.reset();
        return
    }

    //Valida cantidad de dinero a invertir, minimo $1000:
    if (!expresiones.dinero.test(cantidadDinero)) {
        alert('cantidad minima $1000');
        formularioValidacion.reset();
        return
    }
    
    //Valida edad:

    if (edad >= 18) {
        tarjetas.classList.remove('hidden');
        bienvenida.innerHTML = `Hola ${nombre} , estos son los resultados de su busqueda: `;
        calculos();
    }
    else {
        alert(`Lo siento ${nombre} eres menor de edad `);
        tarjetas.classList.add('hidden');
        formularioValidacion.reset();
    }
    guardarLs()//guarda en local storage
}

//Funcion calculo matematico del plazo fijo
function calculos() {
    bienvenida.innerHTML = `Hola ${nombre.toLocaleUpperCase()} , estos son los resultados de su busqueda: `
    utilidad30 = Math.round(cantidadDinero * 38 / 100 / 12);
    utilidad60 = Math.round(cantidadDinero * 37 / 100 / 12 * 2);
    utilidad90 = Math.round(cantidadDinero * 37.50 / 100 / 12 * 3);
    crearTarjetas()
}

//Funcion para mostrar en cards la informacion con los 3 tipos de plazo fijo que puede escoger
function crearTarjetas() {
    // ESTE ES UN ARRAY DE OBJETOS, PARA RECORRER Y RELLENAR DINAMICAMENTE LAS TARJETAS DE INFO PLAZOS
    const datosTarjetas = [
        {
            dias: 30,
            ganancia: utilidad30

        },
        {
            dias: 60,
            ganancia: utilidad60
        },
        {
            dias: 90,
            ganancia: utilidad90
        }
    ]

    infoTarjeta = '';
    datosTarjetas.forEach(element => {
        infoTarjeta = infoTarjeta +
            `   
        <div class="card col-md-3 mx-1 card border-dark cardInfoPlazo">
            <div class="card-body ">
                <h5 class="card-header">Su inversion de $${cantidadDinero} a ` + element.dias + ` dias </h5>
                <p >Total a cobra:$`+ (cantidadDinero + element.ganancia) + `</p>
                <p > Total ganancia:$`+ element.ganancia + `</p>   
            
                                                    <!-- Button trigger modal -->
                    <button type="button" class="btn btnModal" data-bs-toggle="modal" data-bs-target="#exampleModal"> Ver</button>

                                                    <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"> ... </div>
                <div class="modal-footer">
                
               
                <input type="checkbox" id="btnTerminos" value=""> <label for="btnTerminos">Aceptar <a href="#"> terminos y condiciones </a></label>
                <button type="button" class="btn " id="btn-continuarPF">Continuar</button>
                <button type="button" class="btn "id="btn-cerrarModal" data-bs-dismiss="modal">Cerrar</button>
                <hr>
                
            <form action="" id="formularioContinuar" class="container" >

                
                    <div class="row">
                        <h3>Informacion Personal</h3>
                        <input class="col-5" type="text" id="nombres" name="nombres" placeholder="Nombres" required>
                        <input class="col-5" type="text" id="apellidos" name="apellidos" placeholder="Apellidos" required>
                        <input class="col-5" type="email" id="email" name="email" placeholder="Correo Electronico" required>
                        <input class="col-5" type="number" id="alias" name="telefono" placeholder="Telefono" required>
                        <input class="col-5" type="number" id="dni" name="dni" placeholder="Dni" required>
                        <input class="col-5" type="number" id="cbu" name="cbu" placeholder="Cbu" required>
                        <input class="col-5" type="number" id="numerocta" name="numerocta" placeholder="Numero de Cuenta"
                            required>
                        <input class="col-5" type="text" id="alias" name="alias" placeholder="Alias" required>
                        </div>
                    
                  
                        <button  type="submit" name="" id="btnEnviarDatosPersonales" class="mt-2">Enviar</button>       
                        <div id="adios" >
                        <img src="https://img.icons8.com/ios-filled/60/000000/mailbox-plane.png"/>
                        `+ (nombre.toLocaleUpperCase()) + ` Te enviamos   un mail</div>        
             
        
            </form>
                </div>
                </div>
                </div>
                </div>
            </div>
         </div>   `
    });

    tarjetas.innerHTML = infoTarjeta;

    //Construcion de modales 
    let btnModal = document.querySelectorAll('.btnModal');
    let modalTitle = document.querySelector('.modal-title');
    let modalBody = document.querySelector('.modal-body');

    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    //funcion para sumar dias 30,60,90 e informar al cliente cuando vence su plazo fijo:
    function sumarDias(fecha, dias) {
        fecha.setDate(fecha.getDate() + dias);
        return fecha.toLocaleDateString();
    }
    sumarDias(new Date, 30)


    //Ventanas modales para que el usuario vea el resumen y pueda continuar con el tramite:
    btnModal[0].addEventListener('click', function () {
        modalTitle.innerHTML =
            `Estas invirtiendo $${cantidadDinero} <br>
            Ganacia   $${utilidad30}`;

        modalBody.innerHTML =
            `   <ul>
                        <li> <b> Plazo:</b>  30 dias</li>                        
                        <li><b> TNA:</b>  38%</li>
                        <li><b> Fecha Actual:</b> `+ dia + `/` + mes + `/` + anio + ` </li>
                        <li><b> Vence:</b> `+ sumarDias(new Date, 30) + `</li>
                        <li><b> Monto a Acreditar:</b>  $`+ (cantidadDinero + utilidad30) + ` </li>
                        <li><b> Accion al Vencimiento:</b>  Acreditacion en la Cuenta</li>
                </ul>`
    })
    btnModal[1].addEventListener('click', function () {
        modalTitle.innerHTML =
            `Estas invirtiendo <br> $${cantidadDinero}
            <p>Ganacia <br>  $${utilidad60}</p>  `;

        modalBody.innerHTML =
            `   <ul>
                    <li><b> Plazo:</b>  60 dias</li>
                    <li><b> TNA:</b> 37%</li>
                    <li><b> Fecha Actual:</b>`+ dia + `/` + mes + `/` + anio + ` </li>
                    <li><b> Vence:</b>`+ sumarDias(new Date, 60) + `</li>
                    <li><b> Monto a Acreditar:</b> $`+ (cantidadDinero + utilidad60) + ` </li>
                    <li><b> Accion al Vencimiento:</b> Acreditacion en la Cuenta</li>
            </ul>`
    })
    btnModal[2].addEventListener('click', function () {
        modalTitle.innerHTML =
            `Estas invirtiendo <br> $${cantidadDinero}
            <p>Ganacia <br>  $${utilidad90}</p>  `;

        modalBody.innerHTML =
            ` <ul>
                <li><b> Plazo:</b>  90 dias</li>
                <li><b> TNA:</b> 37.50%</li>
                <li><b> Fecha Actual:</b>`+ dia + `/` + mes + `/` + anio + ` </li>
                <li><b> Vence:</b>`+ sumarDias(new Date, 90) + `</li>
                <li><b> Monto a Acreditar:</b> $`+ (cantidadDinero + utilidad90) + ` </li>
                <li><b> Accion al Vencimiento:</b> Acreditacion en la Cuenta</li>
            </ul>`
    })

    let fomularioContinuar = $('#formularioContinuar');
    let btnTerminos = $('#btnTerminos');
    let btnContinuarPf = $('#btn-continuarPF');
    let adios = $('#adios');

    adios.hide()

    btnTerminos.click(function () {
        btnContinuarPf.toggle()

        btnContinuarPf.click(function () {
            fomularioContinuar.show(1000)
        })
        if (!btnTerminos.checked) {
            fomularioContinuar.hide(1000)
        }
    });
    fomularioContinuar.submit(function (e) {
        e.preventDefault();
        fomularioContinuar.html(adios.show(1000))
    })
}

//Prevenir el comportamiento del btn de simular plazo fijo
btnform.addEventListener('click', function (e) {
    e.preventDefault()
})

//Funcion Local Storage-alamaceno a todos mis clientes 
let todosLosClientes = [];
function guardarLs() {
    class Clientes {
        constructor(nombre, edad, cantidadDinero) {
            this.nombre = nombre;
            this.edad = edad;
            this.inversion = cantidadDinero;
        }
    }
    let cliente1 = new Clientes(nombre, edad, cantidadDinero);
    todosLosClientes.push(cliente1)
    console.log(cliente1);

    localStorage.setItem('cliente', JSON.stringify(todosLosClientes));
}


