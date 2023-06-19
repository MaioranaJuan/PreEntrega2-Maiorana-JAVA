class Ropa {
    constructor(nombre, precio, foto) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

let Carrito = [];

// variables
let pago = 0;
let cancelar = 0;
let ProductosEnCarrito = "";
let finalizado = false;

// Productos
const bandanaAkatzuki = new Ropa("Bandana Akatzuki", 1300, "Bandana-Konoha.png");
const bodyAkatzuki = new Ropa("Body Akatzuki", 2000, "BodyAkatzuki.webp");
const buzoUchiha = new Ropa("Buzo Uchiha", 5000, "Buzo-Uchiha.webp");
const BuzoUchihaRojo = new Ropa("Buzo Uchiha Rojo", 5000, "BuzoUchihaRojo.webp");
const PantuflasAkatzuki = new Ropa("Pantuflas Akatzuki", 1500, "PantuflasAkatzuki.webp");
const ConjuntoNaruto = new Ropa("Conjunto Naruto", 2300, "ConjuntoNaruto.webp");
const GorraAkatzuki = new Ropa("Gorra Akatzuki", 1800, "GorraAkatzuki.webp");
const MediasNaruto = new Ropa("Medias Naruto", 500, "MediasNaruto.webp");
const BufandaAkatzuki = new Ropa("Bufanda Akatzuki", 800, "Bufanda Akatzuki.webp");

const elementoPago = document.querySelector("#Precio");
const elementoCarrito = document.querySelector("#Carrito");
const HabilitarCompra = document.getElementById('Compra');
const HabilitarLimpieza = document.getElementById('Limpieza');

// precio del carrito
elementoPago.innerText = pago;

// agregado de productos al carrito
function comprar(Ropa) {
    Carrito.push(Ropa);
    pago = pago + Ropa.precio;
    let elementoRopa = `
    <li>
        <img src="assets/${Ropa.foto}" class="imgCarrito"/>
        <p class="imgCarrito"><span class="carritoText">${Ropa.nombre}</span> $${Ropa.precio}</p>
    </li>
    `;
    elementoCarrito.innerHTML += elementoRopa;
    elementoPago.innerText = pago;

    if (Carrito.length > 0) {
        HabilitarCompra.disabled = false;
        HabilitarLimpieza.disabled = false;
    }
    ProductosEnCarrito = Carrito.toString();
}

function Asegurar() {
    let CompraFinal = parseInt(prompt("Desea utilizar este método de pago?\n 1) Sí\n 2) No"));

    if (CompraFinal === 1) {
        alert("Gracias por confiar en nosotros a la hora de hacer su compra");
        alert("Usted ha comprado " + ProductosEnCarrito);
        Carrito.splice(0, Carrito.length);
        Carrito = [];
        elementoCarrito.innerHTML = "";
        pago = 0;
        elementoPago.innerText = pago;
        HabilitarCompra.disabled = true;
        HabilitarLimpieza.disabled = true;
        finalizado = true;
    } else if (CompraFinal === 2) {
        alert("Redirigiendo....");
    }
}


function Finalizar() {
    while (cancelar != 3 && !finalizado) {
        let direccion = prompt("Ingrese su dirección para continuar con la compra:");

        let confirmar = parseInt(prompt("Su dirección es '" + direccion + "'.\n¿Desea cambiar la dirección?\n 1) Sí\n 2) No\n 3) Cancelar Operación"));

        switch (confirmar) {
            case 1:
                alert("Redirigiendo...");
                continue;

            case 2:
                let metodos = prompt("Elija el método de pago:\n 1) Crédito\n 2) Débito/Efectivo");

                if (metodos == 1) {
                    alert("Con tarjetas de crédito tienes hasta 12 cuotas sin interés.");
                    alert("Precio Final: $" + pago + " en 12 cuotas de $" + pago / 12);
                    Asegurar();
                } else if (metodos == 2) {
                    alert("Con efectivo el pago es de $" + pago);
                    Asegurar();
                } else {
                    alert("ERROR");
                }
                continue;

            case 3:
                cancelar = 3;
                finalizado = true;
                break;
        }
    }
}

function Limpiar() {
    let limpieza = parseInt(prompt("Esta seguro que desea limpiar el carrito? \n 1)Si \n 2)No"));
    if (limpieza == 1) {
        Carrito = [];
        elementoCarrito.innerHTML = "";
        pago = 0;
        elementoPago.innerText = pago;
        HabilitarCompra.disabled = true;
        HabilitarLimpieza.disabled = true;
    }
}