// Variables globales
let currentScholarship = '';
let userProfile = {
    promedio: 9.2,
    carrera: 'Ingeniería en Tecnologías de Software',
    universidad: 'UANL',
    situacionEconomica: 'media',
    localidad: 'Monterrey'
};

// Filtrado de becas
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            filterScholarships(filter);
        });
    });
});

function filterScholarships(filter) {
    const sections = document.querySelectorAll('.scholarship-section');
    
    sections.forEach(section => {
        if (filter === 'all' || section.getAttribute('data-category') === filter) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Sistema de alertas personalizadas
function calculateEligibleScholarships() {
    const eligibleScholarships = [];
    
    // Lógica de elegibilidad basada en el perfil del usuario
    if (userProfile.promedio >= 90) {
        eligibleScholarships.push('Beca de Excelencia Académica UANL');
        eligibleScholarships.push('Beca Fundación Telmex');
        eligibleScholarships.push('Beca Google for Education');
    }
    
    if (userProfile.promedio >= 85) {
        eligibleScholarships.push('Beca de Apoyo Económico');
    }
    
    if (userProfile.promedio >= 80) {
        eligibleScholarships.push('Beca Benito Juárez');
        eligibleScholarships.push('Jóvenes Escribiendo el Futuro');
    }
    
    // Mostrar resultados
    const alertMessage = document.getElementById('alert-message');
    if (eligibleScholarships.length > 0) {
        alertMessage.innerHTML = `
            <strong>¡Excelente! Puedes aplicar a ${eligibleScholarships.length} becas:</strong>
            <br>
            <small>${eligibleScholarships.join(', ')}</small>
            <br><br>
            <em>Basado en tu promedio de ${userProfile.promedio} y perfil académico</em>
        `;
    } else {
        alertMessage.innerHTML = `
            <strong>Puedes mejorar tu elegibilidad:</strong>
            <br>
            <small>Enfócate en mantener tu promedio arriba de 85 para más oportunidades</small>
        `;
    }
}

// Sistema de aplicación
function applyScholarship(scholarshipName) {
    currentScholarship = scholarshipName;
    document.getElementById('modalTitle').textContent = `Aplicar a ${scholarshipName}`;
    document.getElementById('applicationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('applicationModal').style.display = 'none';
    currentScholarship = '';
}

function redirectToApplication() {
    // Redirección basada en la beca seleccionada
    const scholarshipLinks = {
        'Beca de Alto Promedio en Fime': 'https://www.fime.uanl.mx/tramites/becas-academicas/',
        'Beca de Apoyo Económico': 'https://www.uanl.mx/becas/apoyo',
        'Beca Benito Juárez': 'https://www.gob.mx/becasbenitojuarez/aplicar',
        'Jóvenes Escribiendo el Futuro': 'https://www.gob.mx/jovenesconstruyendoelfuturo/aplicar',
        'Beca Fundación Telmex': 'https://fundaciontelmextelcel.org/becas/aplicar',
        'Beca Google for Education': 'https://edu.google.com/scholarships/apply'
    };
    
    const link = scholarshipLinks[currentScholarship] || 'https://www.uanl.mx/becas';
    window.open(link, '_blank');
    closeModal();
}

// Cerrar modal al hacer click fuera
window.onclick = function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    calculateEligibleScholarships();
});