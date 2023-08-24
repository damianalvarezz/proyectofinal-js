const principal = document.getElementById('principal') // contiene el titulo y todo los demas.
const contenedor= document.getElementById('contenedor') // seria todo lo que esta debajo del titulo.
const registrarse = document.getElementById('registro');
const titulo = document.getElementById('titulo');

const autos = [
    {id: 1, marca: 'volkswagen', modelo: 'Up!', precio: 4390000, foto: "./assets/img/volkswagen1.jpg" }, 
    {id: 2, marca: 'volkswagen', modelo: 'Voyage', precio: 4750000, foto:"./assets/img/volkswagen2.jpg" },
    {id: 3, marca: 'peugeot', modelo: '308', precio: 4450000, foto:"./assets/img/peugeot1.jpg"  },
    {id: 4, marca: 'peugeot', modelo: '2008', precio: 6450000, foto: "./assets/img/peugeot2.jpg" }
]

const marcas = ['./assets/img/Volkswagen-Logo.png', './assets/img/Toyota-Logo.png', './assets/img/renault-logo.png', './assets/img/Peugeot_Logo.png']

let consultas = [];
class Consulta {
    constructor(marca, modelo, precio, cantCuotas, precioCuotas) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.cantCuotas = cantCuotas;
        this.precioCuotas = precioCuotas;
    }
}
function renderMarcas(){
    titulo.innerText = 'Elige la Marca del auto'
    let fotoMarca;
    let nMarca=0;
    for (let marca of marcas) {
        nMarca++;
        fotoMarca = document.createElement('img')
        fotoMarca.setAttribute('id', `${nMarca}`) 
        fotoMarca.setAttribute('src', `${marca}`)
        fotoMarca.setAttribute('maxwidth', '100px')
        contenedor.appendChild(fotoMarca);
    }
}

function renderModelos(marca){
    titulo.innerText = `Elige el modelo de la marca ${marca}`
    contenedor.innerHTML= `` // limpiamos el contenedor
    let fotoModelo;
    for (let modelo of autos) {
        if (modelo.marca == marca) {
            fotoModelo = document.createElement('img')
            fotoModelo.setAttribute ('id', `${modelo.id}`)
            fotoModelo.setAttribute('src', `${modelo.foto}`)
            fotoModelo.setAttribute('maxwidth', '100px')
            contenedor.appendChild(fotoModelo);
        }
        
    }
    volver = document.createElement('button');
    volver.setAttribute('id', 'volver');
    volver.innerText = 'Volver';
    volver.addEventListener('click', ()=>{
        volver.remove()
        confirmar.remove()
        paso1()
    })
    principal.appendChild(volver);
    
}

function renderCuotas(id, miConsulta){
    titulo.innerText = 'Elige la cantidad de cuotas'
    contenedor.innerHTML= `` // limpiamos el contenedor
    confirmar = document.createElement('button')
    confirmar.setAttribute('id', 'confirmar')
    confirmar.innerText = 'Confirmar!'
    principal.appendChild(confirmar)
    autoEncontrado = autos.find(auto => auto.id == id); // busco el auto por id y devuelvo el objeto auto
    console.log(autoEncontrado);

    miConsulta.modelo = autoEncontrado.modelo;
    miConsulta.precio = autoEncontrado.precio;

    //precio total titulo
    precioTotal = document.createElement('h2')
    precioTotal.innerText = `Precio Total a financiar: $${autoEncontrado.precio}`
    contenedor.appendChild(precioTotal)
    //Cuotas
    labelCuotas = document.createElement('label')
    labelCuotas.setAttribute('for', 'cuotas')
    labelCuotas.innerText = "Cantidad de Cuotas: "
    contenedor.appendChild(labelCuotas)
    //select de cuotas
    selectCuotas = document.createElement('select')
    selectCuotas.setAttribute('id', 'cuotas')
    contenedor.appendChild(selectCuotas)
    //opciones de cuotas
    optionCuotas = document.createElement('option')
    optionCuotas.setAttribute('value', '6')
    optionCuotas.innerText = "6"
    selectCuotas.appendChild(optionCuotas)
    optionCuotas = document.createElement('option')
    optionCuotas.setAttribute('value', '12')
    optionCuotas.innerText = "12"
    selectCuotas.appendChild(optionCuotas)
    optionCuotas = document.createElement('option')
    optionCuotas.setAttribute('value', '24')
    optionCuotas.innerText = "24"
    selectCuotas.appendChild(optionCuotas)
    //input text con el total de cada cuota
    precioCuota = document.createElement('input')
    precioCuota.setAttribute('type', 'text')
    precioCuota.setAttribute('id', 'precioCuota')
    precioCuota.readOnly = true;
    contenedor.appendChild(precioCuota);
    //escuchamos el change del select para mostrar el precio de cada cuota
    cuotas = document.getElementById('cuotas')
    console.log(cuotas.value);
    precioCuota.value = autoEncontrado.precio / cuotas.value;
    cuotas.addEventListener('change', ()=>{
        
        precioCuota.value = autoEncontrado.precio / cuotas.value;
    })

    confirmar.addEventListener('click', ()=>{
        miConsulta.cantCuotas = cuotas.value;
        miConsulta.precioCuotas = precioCuota.value;
        consultas.push(miConsulta);
        paso1()
        confirmar.remove()
        volver.remove();
        Swal.fire(
            'Guardado',
            'Se ha guardado la consulta',
            'info'
          )
        console.log(consultas);
    })

}

//Para renderizar las fotos de los autos.
// let foto = document.createElement('img')
//     foto.setAttribute('src',`${Autos[0].foto}`)
//     principal.appendChild(foto)



paso1 = ()=>{
    contenedor.innerHTML=``; //limpiamos el contenedor
    renderMarcas();
    let imgs = document.getElementsByTagName('img'); // array de con todas las img del DOM
    registrarse.remove()
    console.log(imgs);
    //Para cada caso renderisamos distintos modelos,
    imgs[0].addEventListener('click', ()=>{
        var miConsulta = new Consulta('volkswagen', '', 0, 0, 0);
        renderModelos('volkswagen');
        imgs[0].addEventListener('click', ()=>{
            let imgs = document.getElementsByTagName('img'); 
            console.log(imgs[0].getAttribute('id'));
            renderCuotas(imgs[0].getAttribute('id'), miConsulta)
        })
        imgs[1].addEventListener('click', ()=>{
            let imgs = document.getElementsByTagName('img'); 
            console.log(imgs[1].getAttribute('id'));
            renderCuotas(imgs[1].getAttribute('id'), miConsulta)
        })

    })
    imgs[1].addEventListener('click', ()=>{
        renderModelos('toyota');
        
    })
    imgs[2].addEventListener('click', ()=>{
        renderModelos('renault');
    })
    imgs[3].addEventListener('click', ()=>{
        var miConsulta = new Consulta('peugeot', '', 0, 0, 0);
        renderModelos('peugeot');
        imgs[0].addEventListener('click', ()=>{
            let imgs = document.getElementsByTagName('img'); 
            console.log(imgs[0].getAttribute('id'));
            renderCuotas(imgs[0].getAttribute('id'), miConsulta)
        })
        imgs[1].addEventListener('click', ()=>{
            let imgs = document.getElementsByTagName('img'); 
            console.log(imgs[1].getAttribute('id'));
            renderCuotas(imgs[1].getAttribute('id'), miConsulta)
        })
    })

}
registrarse.addEventListener('click',()=>{
    paso1()
    
})



// const marcaSelect= document.getElementById('marca')
// const modeloSelect= document.getElementById('modelo')
// const cuotasSelect = document.getElementById('cuotas')
// const aceptarBoton = document.getElementById('aceptar')

// const modeloPorMarca = {
//     peugeot: ["308", "2008"],
//     volkswagen: ["Up!", "Voyage"]
// }
// const precioPorModelo = {
//     '308' : 4450000,
//     '2008': 6450000,
//     'Up!': 4390000,
//     'Voyage': 4750000
// }

// class Auto {
//     constructor(marca, modelo, precio, cantidadCuotas) {
//         this.marca = marca;
//         this.modelo = modelo;
//         this.precio = precio;
//         this.cantidadCuotas = cantidadCuotas;
//     }
//     obtenerInformacion() {
//         return `Marca: ${this.marca}, Modelo: ${this.modelo}, Precio: $${this.precio}, Cuotas: ${this.cantidadCuotas} cuotas`;
//     }
//     calcularCuotaMensual() {
//         return this.precio / this.cantidadCuotas;
//     }
// }

// const autos =  [];
// function mostrarModelo(){
//     const marcaSelecionada= marcaSelect.value
//     modeloSelect.innerHTML = "" // para limpiar
    
//         modeloSelect.disabled = false

//         modeloPorMarca[marcaSelecionada].forEach(modelo=>{
//             const opcion = document.createElement("option")
//             opcion.value = modelo
//             opcion.textContent = modelo
//             modeloSelect.appendChild(opcion)
//         })
    
// }

// marcaSelect.addEventListener("change", mostrarModelo)
// mostrarModelo();

// aceptarBoton.addEventListener('click', ()=>{
//     var modeloSelecionado = modeloSelect.value
//     precio = precioPorModelo[modeloSelecionado]
//     var auto1 = new Auto(marcaSelect.value, modeloSelect.value, precio, cuotasSelect.value)
//     autos.push(auto1);

// })




// function costoAuto(nombre){
//     let costo;
//     switch (nombre) {
//         case 'peugeot':
//             costo=2000;
//             break;
//         case 'volkswagen':
//             costo=1500;
//             break;
//         case 'renault':
//             costo=1800;
//             break;
//         case 'toyota':
//             costo=1900;
//             break;
//         default:
//             costo = 0;
//             alert ('Debe Ingresar una las marcas: peugeot, volkswagen, renault y toyota');

//     }
//     return costo;
// }
// //Clase constructora de autos.



// alert ('Hola! Este es simulador de un plan de ahorra de autos, primero se pide la marca del auto que puede ser: peugeot, volkswagen, renault y toyota. Luego se pide la cantidad de cuotas que desea para el plan. Se aplica un interes de 100% sobre el valor del automovil. ')
// let costoAutomovil; // Costo Total del Auto
// let marcaAuto;
// const autos = []; // Array de objetos Auto
// do {
//     do {
//         marcaAuto = prompt ('Ingrese la marca del auto: ');
//         // console.log(marcaAuto);
//         costoAutomovil= costoAuto(marcaAuto);
//         // console.log(costoAutomovil);
//     } while (costoAutomovil == 0);
//     alert ('El valor del auto con marca '+marcaAuto+' es de: '+costoAutomovil+' USD');
    
//     let cantCuotas; // Cantidad de cuotas del auto
//     do {
//         cantCuotas = parseInt(prompt('Ingrese la cantidad de cuotas: '))
//         // console.log(cantCuotas);
//         if (cantCuotas == 0) {
//             alert ('Debe ingresar una cantidad de cuotas mayor a 0')
//         }else if(isNaN(cantCuotas)){
//             alert ('Debe ingresar algun valor.')
//             cantCuotas = 0;
//         }
//     } while (cantCuotas == 0);
    
//     let valorCuotas = calcCuotas(cantCuotas); // valor de la cuota bruto.
//     valorCuotas = valorCuotas * 2; // valor de Cuota con el interes. (100% del valor del auto)
//     alert ('El valor de las cuotas es: ' +valorCuotas);
//     let auto1= new Auto (marcaAuto, costoAutomovil, cantCuotas, valorCuotas); // creo el objeto auto
//     autos.push(auto1); // Agrego el objeto auto al array de objetos.


//     do {
//         // Pedimos al usuario que ingrese "si" o "no"
//         var respuesta = prompt("Desea agregar otro auto? Ingresa 'si' o 'no'.");
//         // Convertimos la respuesta a minúsculas para que no importen las mayúsculas
//         respuesta = respuesta.toLowerCase();
//         // Evaluamos la respuesta del usuario
//         if (respuesta === "si") {
//             // console.log("El usuario ingresó 'si'.");
//         } else if (respuesta === "no") {
//             // console.log("El usuario ingresó 'no'.");
//         } else {
//             // Mostramos un mensaje de error y continuamos en el bucle
//             alert("Respuesta inválida. Debes ingresar 'si' o 'no'.");
//         }
//     } while (respuesta !== "si" && respuesta !== "no");


// } while (respuesta === "si");

// alert ('Se muestra por consola todos los autos que usted consulto!. A continuacion se consultara si quiere filtrar los autos consultados por marca.')
// console.log(autos); // mustro el array con todos los objetos auto.


//     do {
//         // Pedimos al usuario que ingrese "si" o "no"
//         var respuesta = prompt("Desea buscar algun auto que consulto recientemente? Ingrese 'si' o 'no' ");
//         // Convertimos la respuesta a minúsculas para que no importen las mayúsculas
//         respuesta = respuesta.toLowerCase();
//         // Evaluamos la respuesta del usuario
//         if (respuesta === "si") {
//             marcaAuto = prompt ('Ingrese la marca del auto a consultar: ');
//             const autosFiltrado = []; // Creo el array que solo va a tener la marca especificada
//             let contador = 0;
//             for (let index = 0; index < autos.length; index++) {
//                 if (autos[index].marca === marcaAuto) {
//                     autosFiltrado.push(autos[index]); // Si en encuentro agregro al nuevo array .
//                     contador++;
//                 }
//             }
//             alert ('Se ha encontrado '+contador+ ' autos consultados con esa marca. Podra vizualizar todos los autos con esa marca en la consola.')
//             console.log(autosFiltrado);
//         } else if (respuesta === "no") {
//             // console.log("El usuario ingresó 'no'.");
//         } else {
//             // Mostramos un mensaje de error y continuamos en el bucle
//             alert("Respuesta inválida. Debes ingresar 'si' o 'no'.");
//         }
        
//     } while (respuesta === "si" );
    









