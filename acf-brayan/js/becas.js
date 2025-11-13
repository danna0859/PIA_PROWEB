const MIS_DATOS = {
    semestre: 5,
    promedio: 8.2
};

const becas = [
    { 
        nombre: "Beca Santander Media Manutención 2025", 
        sector: "Privado", 
        requisitos: "Promedio ≥ 8.0 | Semestre ≥ 1 ", 
        imagen: "images/santander.jpg", 
        enlace: "https://app.santanderopenacademy.com/es/program/media-manutencion-2025", 
        minPromedio: 8.0, 
        minSemestre: 1 
    },
    { 
        nombre: "Becas TELMEX - Fundación Telmex Telcel", 
        sector: "Privado", 
        requisitos: "Promedio ≥ 9.0 | Semestre ≥ 1 | Excelencia | En los beneficios incluye una laptop", 
        imagen: "images/telmex.jpg", 
        enlace: "https://www.fundaciontelmextelcel.org/becas", 
        minPromedio: 9.0, 
        minSemestre: 1 
    },
    { 
        nombre: "Beca Benito Juárez - Educación Superior", 
        sector: "Gobierno", 
        requisitos: "Promedio ≥ 8.0 | Semestre ≥ 1 | Ingresos bajos", 
        imagen: "images/benito.jpg", 
        enlace: "https://www.gob.mx/becasbenitojuarez", 
        minPromedio: 8.0, 
        minSemestre: 1 
    },
    { 
        nombre: "Beca Jóvenes Escribiendo el Futuro", 
        sector: "Gobierno", 
        requisitos: "Semestre ≥ 1 | Estudiante en institución pública prioritaria (UANL/FIME) | $5,800 bimestrales, sin promedio mínimo estricto", 
        imagen: "images/jovenes.png", 
        enlace: "https://www.gob.mx/becasbenitojuarez/articulos/conoce-todo-sobre-la-beca-jovenes-escribiendo-el-futuro", 
        minPromedio: 0,  
        minSemestre: 1 
    },
    { 
        nombre: "Beca Académica por Promedio - FIME", 
        sector: "Universidad", 
        requisitos: "Promedio ≥ 9.0 | Semestre ≥ 1 | Sin reprobadas", 
        imagen: "images/logo_universidad.jpg", 
        enlace: "https://www.fime.uanl.mx/tramites/becas-academicas/", 
        minPromedio: 9.0, 
        minSemestre: 1 
    },
    { 
        nombre: "Beca Escasos Recursos - Rectoría UANL", 
        sector: "Universidad", 
        requisitos: "Promedio ≥ 7.0 | Semestre ≥ 1 | Ingresos bajos", 
        imagen: "images/logo_universidad.jpg", 
        enlace: "https://www.fime.uanl.mx/avisos/becas-de-escasos-recursos/", 
        minPromedio: 7.0, 
        minSemestre: 1 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-becas');
    const resultado = document.getElementById('resultado-evaluacion');
    const btnMostrar = document.getElementById('btn-mostrar');
    const btnEvaluar = document.getElementById('btn-evaluar');

    function crearCard(b, cumple) {
        const card = document.createElement('div');
        card.className = 'beca-card';

        const estadoMsg = cumple !== null
            ? `<p class="mensaje ${cumple ? 'aprobado' : 'rechazado'}">
                   ${cumple ? '¡Puedes aplicar!' : 'No cumples los requisitos'}
               </p>`
            : '';

        const enlaceBtn = cumple
            ? `<a href="${b.enlace}" target="_blank">Solicitar Beca</a>`
            : (cumple === false
                ? `<a href="${b.enlace}" target="_blank">Ver Requisitos</a>`
                : `<a href="${b.enlace}" target="_blank">Más Información</a>`);

        card.innerHTML = `
            <img src="${b.imagen}" alt="${b.nombre}">
            <div class="beca-info">
                <h3>${b.nombre}</h3>
                <p><strong>Sector:</strong> ${b.sector}</p>
                <p><strong>Requisitos:</strong> ${b.requisitos}</p>
                ${estadoMsg}
                ${enlaceBtn}
            </div>
        `;
        lista.appendChild(card);
    }

    btnMostrar.addEventListener('click', () => {
        lista.innerHTML = '';
        resultado.innerHTML = '';
        becas.forEach(b => crearCard(b, null));  
    });

    btnEvaluar.addEventListener('click', () => {
        lista.innerHTML = '';
        resultado.innerHTML = '';
        let accesibles = 0;
        
        becas.forEach(b => {
            const cumple = MIS_DATOS.promedio >= b.minPromedio && MIS_DATOS.semestre >= b.minSemestre;
            if (cumple) accesibles++;
            crearCard(b, cumple);
        });

        const claseResumen = accesibles > 0 ? 'aprobado' : 'rechazado';
        const resumen = document.createElement('div');
        resumen.className = `mensaje ${claseResumen}`;
        resumen.innerHTML = `
            <strong>¡Resultado!</strong> 
            Puedes acceder a <strong>${accesibles}</strong> de ${becas.length} becas.
        `;
        resultado.appendChild(resumen);

        setTimeout(() => {
            alert(`¡Evaluación lista!\n\nSemestre: ${MIS_DATOS.semestre}\nPromedio: ${MIS_DATOS.promedio}\n\nAccesibles: ${accesibles}/6`);
        }, 400);
    });

    btnMostrar.click();
});
