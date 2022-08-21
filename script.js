/*
Este fue mi segundo intento de carrito. 
Tuve un intento previo que derivo en un error que no encontre manera alguna de solucionar.

*/
//Login
registerForm.addEventListener("submit", login)

function login(e){
    e.preventDefault()
    let registerEmail = document.getElementById("registerEmail").value
    let registerPassword = document.getElementById("registerPassword").value
    let lowerCaseLetters = /[a-z]/g
    let upperCaseLetters = /[A-Z]/g
    let numbers = /[0-9]/g

    if(registerEmail.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor complete su Email',
        })
    }else if(registerPassword.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor complete su contraseña',
        })
    }else if(registerEmail.length == 0 && registerPassword.length == 0){
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor agregue un mail o contraseña',
        })

    }else if(registerPassword.length > 8){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Maximo 8 caracteres',
        })

    }else if(!registerPassword.match(numbers)){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor agregue un numero',
        })

    }else if(!registerPassword.match(upperCaseLetters)){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor agregue una mayuscula',
        })

    }else if(!registerPassword.match(lowerCaseLetters)){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor agregue una minuscula',
        })

    }else{
        localStorage.setItem("email", registerEmail);
        localStorage.setItem("password", registerPassword);
        Swal.fire(
            'Good job!',
            'Su cuenta ha sido creada',
            'success'
        )
    }
    registerForm.reset()
}


//Chequeo

const loginForm = document.getElementById("loginForm")

loginForm.addEventListener("submit", check)

function check(e){
    e.preventDefault()
    let storedName = localStorage.getItem("email");
    let storedpassword = localStorage.getItem("password");

    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");

    if(loginEmail.value == storedName && loginPassword.value == storedpassword){
        Swal.fire(
            'Good job!',
            'Se ha logueado con exito',
            'success'
        );
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Error en logueo',
        });
    }
    loginForm.reset()
}


// Emailjs api

const btn = document.getElementById('registerButton');

document.getElementById('registerForm')
.addEventListener('submit', function(event) {
event.preventDefault();

btn.value = 'Sending...';

const serviceID = 'default_service';
const templateID = 'template_z79dlt7';

emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
    btn.value = 'Enviar email';
    alert('Se ha enviado un mensaje a su mail');
    }, (err) => {
    btn.value = 'Enviar mensaje';
    alert(JSON.stringify(err));
    });
});



//Objetos de tienda
const allProducts = [
{
    "id": 1,
    "name" : "Sauron",
    "price" : 1500,
    "img" : "sauron-pop.jpg",
    "quantity" : 1
},

{
    "id": 2,
    "name" : "Frodo Bolson",
    "price" : 2000,
    "img" : "frodo-pop.jpg",
    "quantity" : 1
},

{
    "id": 3,
    "name" : "Smaug",
    "price" : 1800,
    "img" : "smaug-pop.jpg",
    "quantity" : 1
},

{
    "id": 4,
    "name" : "Stormtrooper",
    "price" : 800,
    "img" : "stormtrooper-pop.jpg",
    "quantity" : 1
},

{
    "id": 5,
    "name" : "Darth Vader",
    "price" : 1200,
    "img" : "vader-pop.jpg",
    "quantity" : 1
},

{
    "id": 6,
    "name" : "Han Solo",
    "price" : 1400,
    "img" : "hansolo-pop.jpg",
    "quantity" : 1
}]

//Constantes del dom

const divProductos = document.getElementById("divProductos")
const cartContainer = document.getElementById("cart-items")
const emptyButton = document.getElementById("botonVaciar")
const cartCounter = document.getElementById("cartCounter")
const totalPrice = document.getElementById("totalPrice")

let carrito = []



/*Si activo esta funcion del Json, no entiendo muy bien porque, se rompe el codigo
al no reconocer carrito como un array y dando un error al utilizar forEach lo dejo como 
anotacion para, de ser posible que se me explique porque sucede. Muchas gracias.


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})
*/


//CARRITO

// Funciones de carrito
emptyButton.addEventListener("click", ()=>{
    carrito.length = 0
    Swal.fire("Gracias por su compra")
    actualizarCarrito()
})


allProducts.forEach(producto => {
    const div = document.createElement("div")
    div.classList.add("producto")
    div.classList.add("col-md-6")
    div.innerHTML += `
    <div class="itemProducto container card col-md-6 p-3">
        <h2 class="itemProducto-title text-center">${producto.name}</h2>
        <img src= "./Assets/${producto.img}" class="thumbnail">
        <div class="itemProducto-details">
            <span class="itemProducto-price">$${producto.price}</span>
            <button id= "agregar${producto.id}" class="btn btn-primary agregarItem__boton" type="button">Agregar al carrito</button>
        </div>
    </div>
    `
    divProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id)
    })
})



const agregarAlCarrito = (prodId) => {
    const exist = carrito.some(prod => prod.id === prodId)

    if(exist){
        const prod = carrito.map (prod =>{
            if (prod.id === prodId){
                prod.quantity++
            }
        })
    } else { 
    const item = allProducts.find((prod) => prod.id === prodId)
    carrito.push(item)
    console.log(carrito)
}
    actualizarCarrito()
}

const cartEliminate = (prodId) =>{
    const item = carrito.find((prod) => prod.id === prodId)
    const index = carrito.indexOf(item)
    carrito.splice(index, 1)
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #34A0EA, #1261C0)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    actualizarCarrito()

}

const actualizarCarrito = () => {
    cartContainer.innerHTML = " "

    carrito.forEach((producto)=>{
        const div = document.createElement("div")
        div.className = ("cartProduct col p-5 d-inline")
        div.innerHTML = `
        <h5 class=""> ${producto.name} </h5>
        <p class="d-inline"> $ ${producto.price} </p>
        <p class= "d-inline"> Cantidad: <span id= "cantidad">${producto.quantity }</span></p>
        <button onclick="cartEliminate(${producto.id})" class="btn btn-danger">Eliminar del carrito</button>
        `
        cartContainer.appendChild(div)

        //localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    cartCounter.innerText = carrito.length
    totalPrice.innerText = carrito.reduce((acc,prod) => acc + prod.price, 0)
}

