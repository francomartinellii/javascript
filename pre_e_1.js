
// Alerta de bienvenida
alert("Bienvenido al Conversor de Divisas");

// Map y objeto
const tasasDeCambio = new Map([
  ["usd", { tasa: 380, simbolo: "$", nombre: "Dólar Estadounidense" }],
  ["euro", { tasa: 410, simbolo: "€", nombre: "Euro" }],
  ["real", { tasa: 83, simbolo: "R$", nombre: "Real Brasileño" }],
  ["gbp" , { tasa: 450, simbolo: "£" , nombre:"Libra Esterlina"}],
]);

// Array monedas aceptadas
const monedasAceptadas = ["usd", "euro", "real" , "gbp"];

// Función cotizacion
function cotizacion(monto, moneda) {
  if (tasasDeCambio.has(moneda)) {
    let tasa = tasasDeCambio.get(moneda);
    let total = monto * tasa.tasa;
    return {
      simbolo: tasa.simbolo,
      nombre: tasa.nombre,
      total: total,
    };
  } else {
    return null;
  }
}

// Bucle principal
let cotizar = true;

while (cotizar) {
  // Pedir moneda y monto a cotizar
  let moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real, gbp").toLowerCase();
  while (!monedasAceptadas.includes(moneda)) {
    alert("Moneda no válida");
    moneda = prompt("Elige la moneda que quieres cotizar: usd, euro, real, gbp").toLowerCase();
  }

  let monto = prompt("Ingresa el monto:");
  while (isNaN(monto) || (monto) <= 0) {
    alert("Monto no válido el monto debe ser positivo");
    monto = prompt("Ingresa el monto:");
  }
  monto = parseInt(monto);

  // Calcular cotización
  let resultado = cotizacion(monto, moneda);

  if (resultado) {
    // Mostrar resultado
    console.log("Nueva cotización:");
    console.log(`Monto a cotizar: ${resultado.simbolo} ${monto}`);
    console.log(`Moneda: ${resultado.nombre}`);
    console.log(`Total en pesos: $${resultado.total}`);
    console.log("");

    // Preguntar si se desea cotizar de nuevo
    let respuesta = prompt("¿Quieres cotizar de nuevo? si/no").toLowerCase();
    while (respuesta !== "si" && respuesta !== "no") {
      alert("Respuesta no válida");
      respuesta = prompt("¿Quieres cotizar de nuevo? si/no").toLowerCase();
    }
    cotizar = respuesta === "si";
  } else {
    alert("Ha ocurrido un error. Inténtalo de nuevo.");
  }
}

// Alerta de despedida
alert("Gracias por usar el Conversor de Divisas");

