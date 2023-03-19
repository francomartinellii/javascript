//Api cotizacion oficial desde dolarsi
function showDollarExchange() {
    fetch('https://www.dolarsi.com/api/api.php?type=dolar')
        .then(response => response.json())
        .then(data => {
            // Obtener la cotización oficial dolar
            const oficial = data.find(item => item.casa.nombre === 'Oficial');
            const oficialCompra = oficial.casa.compra;
            const oficialVenta = oficial.casa.venta;

            // Mostrar la cotización oficial dolar
            const oficialElem = document.getElementById('oficial');
            oficialElem.innerHTML = ` Compra: ${oficialCompra} - Venta: ${oficialVenta} /` ;
        })

    fetch('https://www.dolarsi.com/api/api.php?type=euro')
        .then(response => response.json())
        .then(data => {
            // Obtener la cotización oficial euro
            const oficial = data.find(item => item.casa.nombre === 'Vaccaro S.A.');
            const oficialCompra = oficial.casa.compra;
            const oficialVenta = oficial.casa.venta;

            // Mostrar la cotización oficial euro
            const oficialElem = document.getElementById('euro');
            oficialElem.innerHTML = ` Compra: ${oficialCompra} - Venta: ${oficialVenta} / ` ;
        })

    fetch('https://www.dolarsi.com/api/api.php?type=real')
        .then(response => response.json())
        .then(data => {
            // Obtener la cotización oficial real
            const oficial = data.find(item => item.casa.nombre === 'Vaccaro S.A.');
            const oficialCompra = oficial.casa.compra;
            const oficialVenta = oficial.casa.venta;

            // Mostrar la cotización oficial real
            const oficialElem = document.getElementById('real');
            oficialElem.innerHTML = ` Compra: ${oficialCompra} - Venta: ${oficialVenta} / ` ;
        })

        fetch('https://www.dolarsi.com/api/api.php?type=libra')
        .then(response => response.json())
        .then(data => {
            // Obtener la cotización oficial libra
            const oficial = data.find(item => item.casa.nombre === 'Vaccaro S.A.');
            const oficialCompra = oficial.casa.compra;
            const oficialVenta = oficial.casa.venta;

            // Mostrar la cotización oficial libra
            const oficialElem = document.getElementById('libra');
            oficialElem.innerHTML = ` Compra: ${oficialCompra} - Venta: ${oficialVenta}  ` ;
        })
}

showDollarExchange();

const tasasDeCambio = [
    { moneda: "usd", tasa: 383, simbolo: "u$d", nombre: "Dólar Estadounidense" },
    { moneda: "euro", tasa: 410, simbolo: "€", nombre: "Euro" },
    { moneda: "real", tasa: 83, simbolo: "R$", nombre: "Real Brasileño" },
    { moneda: "gbp", tasa: 450, simbolo: "£", nombre: "Libra Esterlina" },
];


const monedasAceptadas = ["usd", "euro", "real", "gbp"];

const cotizarButton = document.getElementById("cotizar");
const resultadoDiv = document.getElementById("resultado");
const errorDiv = document.getElementById("error");
const historialDiv = document.getElementById("historial");
const cotizaciones = [];

function guardarDatos() {
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones));
}

function cargarDatos() {
    const data = localStorage.getItem("cotizaciones");
    if (data) {
        cotizaciones.push(...JSON.parse(data));
        actualizarHistorial();
    }
}

cargarDatos();
//Cotizador
cotizarButton.addEventListener("click", () => {
    const moneda = document.getElementById("moneda").value;
    const monto = parseInt(document.getElementById("monto").value);

    if (isNaN(monto) || monto <= 0) {
        errorDiv.innerText = "Monto no válido, el monto debe ser un número positivo";
        resultadoDiv.innerHTML = "";
        return;
    }

    if (!monedasAceptadas.includes(moneda)) {
        errorDiv.innerText = "Moneda no válida";
        resultadoDiv.innerHTML = "";
        return;
    }

    const tasa = tasasDeCambio.find((tasa) => tasa.moneda === moneda);

    if (!tasa) {
        errorDiv.innerText = "Ha ocurrido un error. Inténtalo de nuevo.";
        resultadoDiv.innerHTML = "";
        return;
    }

    const total = monto * tasa.tasa;
    const cotizacion = {
        moneda: tasa.nombre,
        monto: monto,
        total: total,
        fecha: new Date()
    };
    cotizaciones.push(cotizacion);

    guardarDatos();

    resultadoDiv.innerHTML = `
      <p>Nueva cotización:</p>
      <p>Monto a cotizar: ${tasa.simbolo}${monto}</p>
      <p>Moneda: ${tasa.nombre}</p>
      <p>Total en pesos: $${total}</p>
    `;

    errorDiv.innerHTML = "";

    actualizarHistorial();
});

//Agregar Historial
function actualizarHistorial() {
    historialDiv.innerHTML = "";
    cotizaciones.forEach((cotizacion, index) => {
        const cotizacionDiv = document.createElement("div");
        cotizacionDiv.style.backgroundColor = "rgb(31, 120, 155)"
        cotizacionDiv.style.marginTop = "10%"
        cotizacionDiv.style.borderRadius = "10px"
        cotizacionDiv.style.padding = "5%"
        cotizacionDiv.innerHTML = `
        <p>Cotización anterior:</p>
        <p>Monto cotizado: ${cotizacion.monto} ${cotizacion.moneda}</p>
        <p>Total en pesos: $${cotizacion.total}</p>
        <p>Fecha: ${cotizacion.fecha.toLocaleString()}</p>
      `;
        //Boton Borrar Historial
        const borrarHistorialButton = document.getElementById("borrarHistorial");
        borrarHistorialButton.style.marginTop = "20px"
        //Libreria SweerAlert
        borrarHistorialButton.addEventListener("click", () => {
            Swal.fire({
                title: '¿Estás seguro que deseas borrar el historial?',
                text: "No podrás revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar historial!'
            }).then((result) => {
                if (result.isConfirmed) {
                    cotizaciones.length = 0;
                    guardarDatos();
                    actualizarHistorial();
                    Swal.fire(
                        'Borrado!',
                        'El historial ha sido borrado.',
                        'success'
                    )
                }
            })
        });

        //Boton borrar elemento
        const limpiarBtn = document.createElement("button");
        limpiarBtn.innerText = "Borrar cotizacion";
        limpiarBtn.style.marginTop = "20px"
        limpiarBtn.addEventListener("click", () => {
            cotizaciones.splice(index, 1);
            guardarDatos();
            actualizarHistorial();
        });

        cotizacionDiv.appendChild(limpiarBtn);
        historialDiv.appendChild(cotizacionDiv);
    });
}

actualizarHistorial();

