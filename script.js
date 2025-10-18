// Datos de ejemplo para los proyectos
const projects = [
    {
        title: "Introducción a R (CV)",
        description: "Análisis exploratorio de datos y creación de curriculums usando R.",
        pdfLink: "#", // Reemplaza con el enlace a tu PDF
        codeLink: "#" // Reemplaza con el enlace a tu código R
    }
    // Agrega aquí más proyectos en el mismo formato
];

// Función para crear una tarjeta de proyecto
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-header">
                <h3>${project.title}</h3>
            </div>
            <div class="project-content">
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.pdfLink}" class="btn btn-pdf"><i class="fas fa-file-pdf"></i> Ver PDF</a>
                    <a href="${project.codeLink}" class="btn btn-code"><i class="fas fa-code"></i> Ver Código R</a>
                </div>
            </div>
        </div>
    `;
}

// Función para cargar los proyectos en el contenedor
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = projects.map(project => createProjectCard(project)).join('');
}

// Cargar proyectos cuando la página se cargue
document.addEventListener('DOMContentLoaded', loadProjects);
