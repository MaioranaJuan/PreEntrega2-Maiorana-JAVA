let comando = 0;

while (comando != "Salir"); {
    comando = prompt("1) Enviar mensaje:\n 2) Salir \n 3)Hack")

    switch (comando) {
        case 1:
            let destinatario = prompt("Ingrese el destinatario");
            let mensaje = prompt("Ingrese su ensaje:");
            alert("Mensaje " + mensaje + "enviado a" + destinatario);
            break;

        case 2:
            for (let i = 1; i <= 3; i++) {
                alert("producto N°" + i);
            }
            break;

        case 3:
            alert("Conectandose a la IP de la NASA... Aguarde un momento por favor.");
            let clave = promp("Ingrese la clave por favor:");
            if (clave == 1234) {
                alert("Conectado con la base de datos de la NASA. Obteniendo informacion EXTRATERRESTRE")
                window.location = "";
                comando = "Salir";
                break;
            }
        default:
            alert("este comando no existe");
            break;
    }
}