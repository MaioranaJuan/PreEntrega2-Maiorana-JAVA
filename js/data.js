class Ropa {
    constructor(nombre, precio, foto, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.id = id;
    }
}

let Carrito = [];

// Variables
let pago = 0;
let finalizado = false;

// Productos
const bandanaAkatzuki = new Ropa("Bandana Akatzuki", 1300, "Bandana-Konoha.png", 1);
const bodyAkatzuki = new Ropa("Body Akatzuki", 2000, "BodyAkatzuki.webp", 2);
const buzoUchiha = new Ropa("Buzo Uchiha", 5000, "Buzo-Uchiha.webp", 3);
const BuzoUchihaRojo = new Ropa("Buzo Uchiha Rojo", 5000, "BuzoUchihaRojo.webp", 4);
const PantuflasAkatzuki = new Ropa("Pantuflas Akatzuki", 1500, "PantuflasAkatzuki.webp", 5);
const ConjuntoNaruto = new Ropa("Conjunto Naruto", 2300, "ConjuntoNaruto.webp", 6);
const GorraAkatzuki = new Ropa("Gorra Akatzuki", 1800, "GorraAkatzuki.webp", 7);
const MediasNaruto = new Ropa("Medias Naruto", 500, "MediasNaruto.webp", 8);
const BufandaAkatzuki = new Ropa("Bufanda Akatzuki", 800, "Bufanda Akatzuki.webp", 9);


const elementoPago = document.querySelector("#Precio");
const elementoCarrito = document.querySelector("#Carrito");
const HabilitarLimpieza = document.getElementById('Limpieza');
const btnCompra = document.getElementById('btnCompra');

const carritoDataJSON = localStorage.getItem('carrito');
if (carritoDataJSON) {
    const carritoData = JSON.parse(carritoDataJSON);
    Carrito = carritoData.carrito.map(producto => new Ropa(producto.nombre, producto.precio, producto.foto));
    pago = carritoData.pago;

    Carrito.forEach(ropa => {
        let elementoRopa = `
        <li>
            <img src="assets/${ropa.foto}" class="imgCarrito"/>
            <p class="imgCarrito"><span class="carritoText">${ropa.nombre}</span> $${ropa.precio}</p>
        </li>
        `;
        elementoCarrito.innerHTML += elementoRopa;
    });
}

elementoPago.innerText = pago;

HabilitarLimpieza.disabled = Carrito.length === 0;
btnCompra.disabled = Carrito.length === 0;

// Agregar producto al carrito
function comprar(ropa) {
    Carrito.push(ropa);
    pago += ropa.precio;
    let elementoRopa = `
    <li>
        <img src="assets/${ropa.foto}" class="imgCarrito"/>
        <p class="imgCarrito"><span class="carritoText">${ropa.nombre}</span> $${ropa.precio}</p>
    </li>
    `;
    elementoCarrito.innerHTML += elementoRopa;
    elementoPago.innerText = pago;
    HabilitarLimpieza.disabled = false;
    btnCompra.disabled = false;
    guardarCarrito();
}
const botonLimpiar = document.getElementById('Limpieza');

botonLimpiar.addEventListener('click', function () {
    Limpiar();
});

// Limpiar carrito
function Limpiar() {
    Carrito = [];
    elementoCarrito.innerHTML = "";
    pago = 0;
    elementoPago.innerText = pago;
    HabilitarLimpieza.disabled = true;
    btnCompra.disabled = true;
    guardarCarrito();
}

function guardarCarrito() {
    const carritoData = {
        carrito: Carrito.map(ropa => ({ nombre: ropa.nombre, precio: ropa.precio, foto: ropa.foto })),
        pago: pago
    };
    const carritoDataJSON = JSON.stringify(carritoData);
    localStorage.setItem('carrito', carritoDataJSON);
}

const botonBandana = document.getElementById('comprarBandana');
const botonBody = document.getElementById('comprarBody');
const botonBuzo = document.getElementById('comprarBuzo');
const botonBuzoRojo = document.getElementById('comprarBuzoRojo');
const botonPantuflas = document.getElementById('comprarPantuflas');
const botonConjunto = document.getElementById('comprarConjunto');
const botonGorra = document.getElementById('comprarGorra');
const botonMedias = document.getElementById('comprarMedias');
const botonBufanda = document.getElementById('comprarBufanda');

botonBandana.addEventListener('click', function () {
    comprar(bandanaAkatzuki);
});

botonBody.addEventListener('click', function () {
    comprar(bodyAkatzuki);
});

botonBuzo.addEventListener('click', function () {
    comprar(buzoUchiha);
});

botonBuzoRojo.addEventListener('click', function () {
    comprar(BuzoUchihaRojo);
});

botonPantuflas.addEventListener('click', function () {
    comprar(PantuflasAkatzuki);
});

botonConjunto.addEventListener('click', function () {
    comprar(ConjuntoNaruto);
});

botonGorra.addEventListener('click', function () {
    comprar(GorraAkatzuki);
});

botonMedias.addEventListener('click', function () {
    comprar(MediasNaruto);
});

botonBufanda.addEventListener('click', function () {
    comprar(BufandaAkatzuki);
});

btnCompra.addEventListener('click', function () {
    Swal.fire({
        title: 'Gracias por su compra',
        icon: 'success',
        text: 'Pedido en camino...',
        showConfirmButton: false,
        timer: 2000
    })
    Limpiar();
});