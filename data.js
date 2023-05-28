let comando = 0;
let carrito = 0;
let remeras = 0;
let pantalones = 0;
let accesorios = 0;

while (comando != "Salir") {

    comando = parseInt(prompt("1) Productos\n 2) Metodos de pago \n 3)Carrito \n 4) Salir"));

    switch (comando) {

        // PRODUCTOS
        case 1:
            let list2 = parseInt(prompt("Agregar producto al carrito: \n 1)Remeras \n 2)Pantalones \n 3)Accesorios"));

            if (list2 == 1) {
                let eleccion = parseInt(prompt("Desea agregar 'Remeras' al carrito? \n 1)Si \n 2)No"));
                if (eleccion == 1) {
                    alert("Producto agregado al carrito....");
                    carrito = carrito + 1;
                    remeras = remeras + 1;
                    continue;
                } else if (eleccion == 2) {
                    alert("Volviendo al principio....");
                    continue;
                } else {
                    alert("error");
                    continue;
                }
            } else if (list2 == 2) {
                let eleccion = parseInt(prompt("Desea agregar 'Pantalones' al carrito? \n 1)Si \n 2)No"));
                if (eleccion == 1) {
                    alert("Producto agregado al carrito....");
                    carrito = carrito + 1;
                    pantalones = pantalones + 1;
                    continue;
                } else if (eleccion == 2) {
                    alert("Volviendo al principio....");
                    continue;
                } else {
                    alert("error");
                    continue;
                }
            } else if (list2 == 3) {
                let eleccion = parseInt(prompt("Desea agregar 'Accesoios' al carrito? \n 1)Si \n 2)No"));
                if (eleccion == 1) {
                    alert("Producto agregado al carrito....");
                    carrito = carrito + 1;
                    accesorios = accesorios + 1;
                    continue;
                } else if (eleccion == 2) {
                    alert("Volviendo al principio....");
                    continue;
                } else {
                    alert("error");
                    continue;
                }
            }

        // METODOS DE PAGO
        case 2:
            let metodos = prompt("Elija el metodo de pago:\n 1)Credito \n 2)Debito \n 3)Efectivo");
            if (metodos == 1) {
                alert("Con tarjetas de credito tenes hasta 12 cuotas sin interes.")
            } else if (metodos == 2) {
                alert("Con tarjetas de debito tenes hasta 3 cuotas en los productos de indumentaria.");
            } else if (metodos == 3) {
                alert("Las compras en efectivo son de pago unico y en mano.");
            } else {
                alert("ERROR");
            }
            break;

        // CARRITO
        case 3:
            if (carrito == 0) {
                alert("Sin productos en el carrito");
            } else {
                alert("Productos agregados al carrito: \n" + remeras + " Remeras \n" + pantalones + " Pantalones \n" + accesorios + " Accesorios");
            }
            break;

        // SALIR
        case 4:
            comando = "Salir";
            break;

        default:
            alert("este comando no existe");
            break;

    }
}