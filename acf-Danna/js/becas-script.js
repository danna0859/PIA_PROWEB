// Variables globales
let currentScholarship = '';

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Inicializar filtros
    setupFilters();
    // Configurar modal
    setupModal();
}

// Configurar sistema de filtros
function setupFilters() {
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
}

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

// Configurar modal
function setupModal() {
    const modal = document.getElementById('applicationModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Cerrar modal al hacer click fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Sistema de aplicación
function applyScholarship(scholarshipName) {
    currentScholarship = scholarshipName;
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modalTitle) {
        modalTitle.textContent = `Aplicar a ${scholarshipName}`;
    }
    
    if (modalMessage) {
        modalMessage.innerHTML = `
            <p>¿Estás seguro que deseas aplicar a <strong>${scholarshipName}</strong>?</p>
            <p>Serás redirigido al formulario oficial de aplicación.</p>
        `;
    }
    
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentScholarship = '';
}

function redirectToApplication() {
    // URLs de redirección - MODIFICA ESTAS URLs SEGÚN TUS NECESIDADES
    const scholarshipLinks = {
        'Beca de alto Promedio en FIME': 'https://www.uanl.mx/becas/excelencia',
        'Beca de Apoyo Económico': 'https://www.uanl.mx/becas/apoyo',
        'Beca Benito Juárez': 'https://www.gob.mx/becasbenitojuarez/aplicar',
        'Jóvenes Escribiendo el Futuro': 'https://www.gob.mx/jovenesconstruyendoelfuturo/aplicar',
        'Beca Fundación Telmex': 'https://fundaciontelmextelcel.org/becas/aplicar',
        'Beca Google for Education': 'https://edu.google.com/scholarships/apply'
    };
    
    const link = scholarshipLinks[currentScholarship] || 'https://www.uanl.mx/becas';
    
    // Redirigir a la página correspondiente
    if (link.startsWith('http')) {
        // Para enlaces externos, abrir en nueva pestaña
        window.open(link, '_blank');
    } else {
        // Para enlaces internos, redirigir en la misma ventana
        window.location.href = link;
    }
    
    closeModal();
}

// Exportar funciones para uso global
window.applyScholarship = applyScholarship;
window.closeModal = closeModal;
window.redirectToApplication = redirectToApplication;