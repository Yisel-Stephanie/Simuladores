
//! ***************** Crear boton que aparece al scrollear:

let botonScroll = document.querySelector('.btnScroll');

window.addEventListener('scroll', function () {
    numeroScroll = window.pageYOffset;
    numeroScroll > 100
        ? botonScroll.classList.remove('hidden')
        : botonScroll.classList.add('hidden')
})

botonScroll.addEventListener('click', (e) => {
    window.scrollTo({
        behavior: 'smooth',
        top: 0
    })


})
//! ************************ Boton modo nocturno:

let btnOscuro = document.querySelector('.modoNocturno');
let imgP = document.querySelectorAll('.imgP');

btnOscuro.addEventListener('click', function () {
    document.body.classList.toggle('modo');

    imgP.forEach(element => {
        element.classList.toggle('imgPresent')
    });
})

//! ********************************* Animacion Palabras:
const typed = new Typed('.typed', {
    strings: [
        '<i class="entrada">Prestamos </i>',
        '<i class="entrada">Plazos fijos</i>',
        '<i class="entrada">Tarjeta Debito</i>',
        '<i class="entrada">Tarjeta Credito</i>',
        '<i class="entrada">Inversiones</i>'
    ],
    typeSpeed: 90,
    loop: true,
    // showCursor:true,
    cursorChar: '...'
    // starDelay:200,
    // backSpeed:80,
    // smartBackspace:true,
})

//! ******************************* Animacion Cajas de presentacion jQuery:
$('.cajasPresentacion').hide().show(2000);

//! ********************************* Animacion boton plazo fijo:

// Al inicio de la pagina el formulario de conversion esta oculto
$('#inputsFormularioValidacion').hide();

// ..y aparecera lentamente al dar click
$('#btnSimular').click(function (e) {
    e.preventDefault()
    $('#inputsFormularioValidacion').slideToggle("slow");

})

//! *************************************** Animacion cambio de divisas:
//Imagenes
let imgPeso = `<img src="https://img.icons8.com/emoji/30/000000/argentina-emoji.png"/>`;
let imgDolar = `<img src="https://img.icons8.com/emoji/30/000000/us-outlying-islands-emoji.png"/>`;
let imgEuro = `<img src="https://img.icons8.com/color/50/000000/flag-of-europe.png"/>`


// Al inicio de la pagina el formulario de conversion esta oculto
$('#conversor').hide();

// ..y aparecera lentamente al dar click
$('#btn-conversor').click(function () {
    $('#conversor').slideToggle("slow");
})

// Bloquear la tecla enter
$('form').keypress(function (event) {
    //console.log(event.keyCode)//este es el enter
    if (event.keyCode === 13) {
        event.preventDefault();
    }
});





$('#tablaDia').hide()
$("#btn-conversor").on('click', function () {

    $('#tablaDia').toggle(2000).css('color', 'white')
});

$("caption").html(`Ultima Actualizacion:` + new Date().toLocaleString())