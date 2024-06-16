document.getElementById('intervalo-btn').addEventListener('click', function() {
    document.getElementById('intervalo-calculator').style.display = 'block';
    document.getElementById('puntual-calculator').style.display = 'none';
});

document.getElementById('puntual-btn').addEventListener('click', function() {
    document.getElementById('intervalo-calculator').style.display = 'none';
    document.getElementById('puntual-calculator').style.display = 'block';
});

function calcularIntervalo() {
    const media = parseFloat(document.getElementById('media').value);
    const muestra = parseInt(document.getElementById('muestra').value);
    const desviacion = parseFloat(document.getElementById('desviacion').value);
    const confianza = parseInt(document.getElementById('confianza').value);

    let z;
    if (confianza === 90) z = 1.645;
    else if (confianza === 95) z = 1.96;
    else if (confianza === 99) z = 2.576;
    else {
        alert("Nivel de confianza no válido");
        return;
    }

    const errorEstandar = desviacion / Math.sqrt(muestra);
    const margenError = z * errorEstandar;
    const intervaloInferior = media - margenError;
    const intervaloSuperior = media + margenError;

    document.getElementById('resultado-intervalo').innerText = `Intervalo de Confianza: [${intervaloInferior.toFixed(2)}, ${intervaloSuperior.toFixed(2)}]`;
}

function calcularPuntual() {
    const datos = document.getElementById('datos').value.split(',').map(Number);
    const n = datos.length;
    const tipoEstimacion = document.getElementById('tipo-estimacion').value;
    let resultado;

    switch(tipoEstimacion) {
        case 'media':
            resultado = datos.reduce((a, b) => a + b) / n;
            break;
        case 'mediana':
            datos.sort((a, b) => a - b);
            const mitad = Math.floor(n / 2);
            resultado = n % 2 === 0 ? (datos[mitad - 1] + datos[mitad]) / 2 : datos[mitad];
            break;
        case 'moda':
            const frecuencia = {};
            datos.forEach(num => frecuencia[num] = (frecuencia[num] || 0) + 1);
            const maxFreq = Math.max(...Object.values(frecuencia));
            resultado = Object.keys(frecuencia).filter(num => frecuencia[num] === maxFreq);
            resultado = resultado.length > 1 ? `Modas: ${resultado.join(', ')}` : `Moda: ${resultado[0]}`;
            break;
        case 'desviacion':
            const media = datos.reduce((a, b) => a + b) / n;
            resultado = Math.sqrt(datos.map(x => Math.pow(x - media, 2)).reduce((a, b) => a + b) / n);
            break;
        case 'varianza':
            const mediaVarianza = datos.reduce((a, b) => a + b) / n;
            resultado = datos.map(x => Math.pow(x - mediaVarianza, 2)).reduce((a, b) => a + b) / n;
            break;
        default:
            resultado = 'Opción no válida';
    }

    document.getElementById('resultado-puntual').innerText = `Resultado: ${typeof resultado === 'number' ? resultado.toFixed(6) : resultado}`;
}