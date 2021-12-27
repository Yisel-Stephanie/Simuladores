//Cotizacion:
let dolarHoy = 180;
let euroHoy = 190;
let dolarEuro = 0.84875;
let euroDolar = 1.17805;


// seralizo la informacion recibida
$('#conversor').change(function (e) {
    let serial = $('#conversor').serializeArray();
    let valor1 = serial[0].value;
    let valor2 = serial[2].value;
    let cantidad = serial[1].value;

    if (valor1 === 'peso') $('.ingresa').html(imgPeso);
    if (valor1 === 'dolar') $('.ingresa').html(imgDolar);
    if (valor1 === 'euro') $('.ingresa').html(imgEuro);

    if (valor2 === 'peso') $('.sale').html(imgPeso);
    if (valor2 === 'dolar') $('.sale').html(imgDolar);
    if (valor2 === 'euro') $('.sale').html(imgEuro);


    if (valor1 === 'peso' && valor2 === 'dolar') $('#totalMostrar').html(`Recibirias: $` + (cantidad / dolarHoy).toFixed(2) + ` Dolares`);
    if (valor1 === 'dolar' && valor2 === 'peso') $('#totalMostrar').html(`Recibirias: $` + (cantidad * dolarHoy).toFixed(2) + ` Pesos`);

    if (valor1 === 'peso' && valor2 === 'euro') $('#totalMostrar').html(`Recibirias: $` + (cantidad / euroHoy).toFixed(2) + ` Euros`);
    if (valor1 === 'euro' && valor2 === 'peso') $('#totalMostrar').html(`Recibirias: $` + (cantidad * euroHoy).toFixed(2) + ` Pesos`);

    if (valor1 === 'dolar' && valor2 === 'euro') $('#totalMostrar').html(`Recibirias: $` + (cantidad * dolarEuro).toFixed(2) + ` Euro`);
    if (valor1 === 'euro' && valor2 === 'dolar') $('#totalMostrar').html(`Recibirias: $` + (cantidad * euroDolar).toFixed(2) + ` Dolares`);

})


//Animacion en hija de animaciones.