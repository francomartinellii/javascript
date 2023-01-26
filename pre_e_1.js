//Alerta de bienvenida
alert("Bienvenido a conversor de Divisas");

//Funcion
function cotizacion(monto, moneda) {

    if (moneda == "usd") {
        let cotizacion = monto * 380;
        return cotizacion
    }
    else if (moneda == "euro") {
        let cotizacion = monto * 410;
        return cotizacion
    }

    else if (moneda == "real") {
        let cotizacion = monto * 83;
        return cotizacion
    }

}


let cotizar = "si";

while (cotizar === "si") {
    // Pedir moneda y monto a cotizar
    let moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real");
    while (moneda != "usd" && moneda != "euro" && moneda != "real") {
        alert("Ingresa una moneda valida");
        moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real");
    }
    
    let monto = prompt("Ingresa el monto:");

    // Comprobar que el valor ingresado es un número
    while (isNaN(monto)) {
        alert("Ingresa un número válido");
        monto = prompt("Ingresa el monto:");
    }
    monto = parseInt(monto);
    
    // Llama a la función cotizacion
    let total = cotizacion(monto, moneda);
    console.log("Nueva cotizacion");
    console.log("Monto a cotizar:", monto);
    console.log("Moneda:", moneda);
    console.log("El total en pesos es:", total);

    // Pregunta si quiere cotizar de nuevo
    cotizar = prompt("¿Quieres cotizar de nuevo? si/no");
    while (cotizar != "si" && cotizar != "no") {
        alert("Ingresa una opcion valida");
        cotizar = prompt("¿Quieres cotizar de nuevo? si/no");
    }
}
alert("Gracias por usar el conversor");