class producto {
    constructor(nombre, precio, foto, id, cantidad, categoria) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.id = id;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }
}

class BaseDeDatos {
    constructor() {
        this.inventario = [];
    }

    async Registro() {
        const response = await fetch("../JSON/productos.json");
        this.inventario = await response.json();
        return this.inventario;
    }

    registrosPorNombre(nombreDelProducto) {
        return this.inventario.filter((producto) =>
            producto.nombre.toLowerCase().includes(nombreDelProducto)
        );
    }

    registrosPorCategoria(categoria) {
        return this.inventario.filter((producto) => producto.categoria == categoria);
    }

    buscarProductoPorId(id) {
        return this.inventario.find((producto) => producto.id === id);
    }
}

const bd = new BaseDeDatos();

const productosEnElCarrito = document.querySelector("#carrito");
const precioDelCarrito = document.querySelector("#PrecioCarrito");
const BtnLimpiarCarrito = document.querySelector("#LimpiarCarrito");
const BtnComprar = document.querySelector("#btnComprar");
const SeleccionDeCategorias = document.querySelectorAll(".FiltrosDeCategorias");
const CantidadDeProductos = document.querySelector("#TotalCarrito");
const ProductosALaVista = document.querySelector("#TituloProductos")

SeleccionDeCategorias.forEach((boton) => {
    boton.addEventListener("click", () => {
        quitarClase();
        boton.classList.add("SeleccionDeCategorias");
        const CategoriaDeProductos = boton.innerText;
        ProductosHTML(bd.registrosPorCategoria(CategoriaDeProductos));
        ProductosALaVista.innerHTML = CategoriaDeProductos;
        ProductosALaVista.innerHTML += " :";
    });
});

const TodosNuestrosProductos = document.querySelector("#TodosNuestrosProductos");

TodosNuestrosProductos.addEventListener("click", () => {
    quitarClase();
    TodosNuestrosProductos.classList.add("SeleccionDeCategorias");
    ProductosHTML(bd.inventario);
});

function quitarClase() {
    const botonSeleccionado = document.querySelector(".SeleccionDeCategorias");
    if (botonSeleccionado) {
        botonSeleccionado.classList.remove("SeleccionDeCategorias");
    }
}

const divProductosHTML = document.querySelector("#productos");

bd.Registro().then((inventario) => ProductosHTML(inventario));

class Carrito {
    constructor() {

        const carritoStorage = JSON.parse(localStorage.getItem("carrito"));

        this.carritoContenido = [] || carritoStorage;
        this.precioCarrito = 0;
        this.DuplicadoEnCarrito = 0;

        this.agregarAlCarrito();
    }

    LimpiarCarrito() {
        this.carritoContenido = [];
        productosEnElCarrito.innerHTML = "";
        this.precioCarrito = 0;
        this.DuplicadoEnCarrito = 0;
        precioDelCarrito.innerText = this.precioCarrito;
        CantidadDeProductos.innerText = "carrito";
        BtnLimpiarCarrito.disabled = true;
        BtnComprar.disabled = true;
        localStorage.setItem("carrito", JSON.stringify(this.carritoContenido));
    }

    DuplicadoDeProductos(producto) {
        const productoEnCarrito = this.estaEnCarrito(producto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            this.carritoContenido.push({ ...producto, cantidad: 1 });
        }
        localStorage.setItem("carrito", JSON.stringify(this.carritoContenido));
        this.agregarAlCarrito();
    }

    estaEnCarrito({ id }) {
        return this.carritoContenido.find((producto) => producto.id === id);
    }

    agregarAlCarrito() {
        this.precioCarrito = 0;
        this.DuplicadoEnCarrito = 0;
        productosEnElCarrito.innerHTML = "";
        for (const producto of this.carritoContenido) {
            productosEnElCarrito.innerHTML += `
            <li class="LiCarrito">
                <img src="/assets/${producto.categoria}/${producto.foto}" class="imgCarrito" alt="${producto.nombre}"/>
                <div class="divCarrito">
                    <p class="TextCarrito">${producto.nombre}</p>
                    <p>$${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
                <button class="btn btn-primary btnEliminar" data-id="${producto.id}">
                <i class="fa-regular fa-trash-can"></i> Eliminar</button>
            </li>
        `;

            this.precioCarrito += producto.precio * producto.cantidad;
            this.DuplicadoEnCarrito += producto.cantidad;
        }

        const btnEliminarProducto = document.querySelectorAll(".btnEliminar");

        for (const boton of btnEliminarProducto) {
            boton.onclick = (event) => {
                event.preventDefault();
                this.EliminarProductos(Number(boton.dataset.id));
                if (this.carritoContenido <= 1) {
                    BtnLimpiarCarrito.disabled = true;
                    BtnComprar.disabled = true;
                }
            }
        }

        precioDelCarrito.innerText = this.precioCarrito;
        if (this.DuplicadoEnCarrito < 1) {
            CantidadDeProductos.innerText = "carrito";
        } else {
            CantidadDeProductos.innerText = this.DuplicadoEnCarrito;
        }
        BtnLimpiarCarrito.disabled = false;
        BtnComprar.disabled = false;

    }

    EliminarProductos(id) {
        const indice = this.carritoContenido.findIndex((producto) => producto.id === id);

        if (this.carritoContenido[indice].cantidad > 1) {
            this.carritoContenido[indice].cantidad--;
        } else {
            this.carritoContenido.splice(indice, 1);
        }
        localStorage.setItem("carrito", JSON.stringify(this.carritoContenido));
        this.agregarAlCarrito();
    }
}

function ProductosHTML(inventario) {
    divProductosHTML.innerHTML = "";
    for (const producto of inventario) {
        divProductosHTML.innerHTML += `
        <div class="col">
            <div class="card">
                <img class="imgHTML" src="./assets/${producto.categoria}/${producto.foto}" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary agregar" type="submit" data-id="${producto.id}">Agregar al carrito <i
                    class="fa-solid fa-cart-plus"></i></button>
                </div>
            </div>
        </div>
        `;
    }

    const btnAgregar = document.querySelectorAll(".agregar");

    for (const boton of btnAgregar) {
        boton.addEventListener("click", function () {
            const id = Number(boton.dataset.id);
            const productos = bd.buscarProductoPorId(id);
            carrito.DuplicadoDeProductos(productos);
        });
    }
}

BtnLimpiarCarrito.addEventListener("click", function () {
    carrito.LimpiarCarrito();
});

BtnComprar.addEventListener("click", function () {
    Swal.fire({
        title: 'Gracias por su compra',
        icon: 'success',
        text: 'Pedido en camino...',
        showConfirmButton: false,
        timer: 2000
    });
    carrito.LimpiarCarrito();
});

const BuscadorInput = document.querySelector("#BuscadorInput");

BuscadorInput.addEventListener("input", () => {
    const palabra = BuscadorInput.value;
    const productosEncontrados = bd.registrosPorNombre(palabra.toLowerCase());
    ProductosHTML(productosEncontrados);
});

const carrito = new Carrito();

BtnLimpiarCarrito.disabled = carrito.carritoContenido.length <= 1;
BtnComprar.disabled = carrito.carritoContenido.length <= 1;

