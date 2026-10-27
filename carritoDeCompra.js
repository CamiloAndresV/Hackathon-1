// Declaraciones necesarias
let carrito = [];

// logica y funciones del carrito
function buscarPlato(id) {
    return carrito.find((platoCarrito) => platoCarrito.plato.id === id);
}

//Se trare el valor y se convierte a pesos colombianos
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

//agregar productos al carrito
function buscarProducto(id) {
    return productos.find((producto) => producto.id === id);
}

function agregarAlCarrito(id) {
    const producto = buscarProducto(id);
    const platoCarrito = buscarPlato(id);

    if (platoCarrito) {
        platoCarrito.cantidad++;
    } else {
        carrito.push({
            plato: producto,
            cantidad: 1,
        });
    }
}

//quitar productos del carrito
function quitarDelCarrito(id) {
    carrito = carrito.filter((platoCarrito) => platoCarrito.plato.id !== id);
}


//cambiar cantidad
function cambiarCantidad(id, cambio) {
    const platoCarrito = buscarPlato(id);

    if (!platoCarrito) {
        return;
    }

    platoCarrito.cantidad += cambio;

    if (platoCarrito.cantidad <= 0) {
        quitarDelCarrito(id);
    }
}

//calcular total
function calcularTotal() {
    let total = 0;

    for (const platoCarrito of carrito) {
        total += platoCarrito.plato.precio * platoCarrito.cantidad;
    }

    return total;
}

//contar cantidad de productos
function contarProductos() {
    let cantidad = 0;

    for (const platoCarrito of carrito) {
        cantidad += platoCarrito.cantidad;
    }

    return cantidad;
}

//persistencia del carrito
const CLAVE_CARRITO = "colombia-en-un-plato-carrito";

//guardar el carrito en el localStorage
function guardarCarrito() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

//leer el carrito desde el local storage
function leerCarrito() {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (carritoGuardado === null) {
        return [];
    }

    try{
        return JSON.parse(carritoGuardado);
    }catch(error) {
        console.warn("Dato dañado en el carrito, se usa el valor por defecto")
        return [];
    }
}

//Mostrar carrito
const listaCarrito = document.querySelector("#carrito-contenido");
const contadorCarrito = document.querySelector("#contador-carrito");
const totalCarrito = document.querySelector("#precio-total");
const botonVaciar = document.querySelector("#btn-vaciar");
const botonComprar = document.querySelector("#btn-comprar");
const catalogoProductos = document.querySelector("#catalogo-productos");

function mostrarCarrito(){
    let html = "";

    if(carrito.length === 0){
        html = `<p class="vacio">Tu carrito está vacío. Agrega algo de la carta.</p>`;
    } else {
        for (const platoCarrito of carrito) {
            html += `
                <div class="plato">
                    <span class="plato-nombre">${platoCarrito.plato.nombre}</span>
                    <span class="plato-subtotal">${formatearPrecio(
                        platoCarrito.plato.precio * platoCarrito.cantidad
                    )}</span>
                    <span class="cantidad">
                        <button type="button" data-accion="restar" data-id="${platoCarrito.plato.id}" aria-label="Quitar uno">−</button>
                        <span>${platoCarrito.cantidad}</span>
                        <button type="button" data-accion="sumar" data-id="${platoCarrito.plato.id}" aria-label="Agregar uno">+</button>
                    </span>
                    <button class="quitar" type="button" data-accion="quitar" data-id="${platoCarrito.plato.id}">Quitar</button>
                </div>`;
        }
    }

    listaCarrito.innerHTML = html;
    contadorCarrito.textContent = contarProductos();
    totalCarrito.textContent = formatearPrecio(calcularTotal());
}

function actualizarCarrito() {
    guardarCarrito();
    mostrarCarrito();
}


// Evento para agregar platos desde el catálogo
catalogoProductos.addEventListener("click", function (evento) {
    const accion = evento.target.dataset.accion;
    const id = Number(evento.target.dataset.id);

    if (accion === "agregar") {
        agregarAlCarrito(id);
        actualizarCarrito();
    }
});

// Eventos para cambiar o quitar platos desde el carrito
listaCarrito.addEventListener("click", function (evento) {
    const accion = evento.target.dataset.accion;
    const id = Number(evento.target.dataset.id);

    if (accion === "sumar") {
        cambiarCantidad(id, 1);
    } else if (accion === "restar") {
        cambiarCantidad(id, -1);
    } else if (accion === "quitar") {
        quitarDelCarrito(id);
    } else {
        return;
    }

    actualizarCarrito();
});

botonVaciar.addEventListener("click", function () {
    if (carrito.length === 0) {
        return;
    }

    const seguro = confirm("¿Seguro que quieres vaciar tu carrito?");

    if (seguro) {
        carrito = [];
        actualizarCarrito();
    }
});

botonComprar.addEventListener("click", function () {
    if (carrito.length === 0) {
        return;
    }

    carrito = [];
    actualizarCarrito();
});


// ===== Inicio =====
carrito = leerCarrito();
mostrarCarrito();
