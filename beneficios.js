// USANDO Fetch
//fetch('http://localhost:3000/beneficios')
fetch("../consumoApis/db.json")
    .then((res) => res.json())
    .then((datos) => {
        // console.log(datos.beneficios)
        cardBeneficios = '';
        let beneficios = document.getElementById('beneficios')
        datos.beneficios.forEach(element => {
            cardBeneficios = cardBeneficios +
                ` <div class="col">
                <div class="card cardBeneficios" style="width: 18rem;">              

                    <div class="card-body">
                            <img src= `+ element.img + `  alt="">
                            <p class="card-text porcentaje">`+ element.porcentaje + `%` + `</p>
                            <h5 class="card-title">`+ element.titulo + `</h5>
                                <p class="card-text">`+ element.descripcion + `</p>
                                <p class="card-text"> <i>`+ element.condiciones + `</i></p>
                    </div>
                </div>
            </div>`
        });
        beneficios.innerHTML = cardBeneficios
    })
    .catch((error) => console.log("Algo salio mal Error:", error.status))

// ********************************************************************************** USANDO jQuery
//$.get('../consumoApis/db.json', function (datos) { console.log(datos.beneficios) })

