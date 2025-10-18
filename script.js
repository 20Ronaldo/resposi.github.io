// Array para almacenar proyectos
let projects = [];

// Función para mostrar proyectos
function displayProjects() {
    const projectsContainer = document.getElementById('projectsList');
    projectsContainer.innerHTML = '';

    // Si no hay proyectos, mostrar mensaje
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No hay proyectos aún. ¡Agrega el primero!</p>';
        return;
    }

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.image ? `<img src="${project.image}" alt="${project.title}">` : ''}
            <a href="${project.link}" class="project-link" target="_blank">Ver Proyecto</a>
            <button class="delete-btn" onclick="deleteProject(${index})">Eliminar</button>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Función para agregar proyecto
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const link = document.getElementById('projectLink').value.trim();
    const image = document.getElementById('projectImage').value.trim() || null;
    
    // Validaciones básicas
    if (!title || !description || !link) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Validar URL
    try {
        new URL(link);
    } catch (e) {
        alert('Por favor, introduce una URL válida para el enlace del proyecto.');
        return;
    }
    
    if (image) {
        try {
            new URL(image);
        } catch (e) {
            alert('La URL de la imagen no es válida. Déjala vacía si no tienes una imagen.');
            return;
        }
    }

    const newProject = {
        title,
        description,
        link,
        image
    };

    projects.push(newProject);
    displayProjects();
    
    // Guardar en localStorage
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    
    // Limpiar formulario
    document.getElementById('projectForm').reset();
    
    // Mostrar mensaje de éxito
    showNotification('¡Proyecto agregado exitosamente!', 'success');
});

// Función para eliminar proyecto
function deleteProject(index) {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
        projects.splice(index, 1);
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        displayProjects();
        showNotification('Proyecto eliminado', 'info');
    }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    
    // Establecer color según el tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'info') {
        notification.style.backgroundColor = '#3498db';
    } else {
        notification.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cargar proyectos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
        try {
            projects = JSON.parse(savedProjects);
        } catch (e) {
            console.error('Error al cargar proyectos guardados:', e);
            projects = [];
        }
    }
    displayProjects();
    
    // Agregar funcionalidad básica al formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('¡Mensaje enviado! Te contactaré pronto.', 'success');
            contactForm.reset();
        });
    }
    
    // Agregar proyectos de ejemplo si no hay ninguno
    if (projects.length === 0) {
        projects.push(
            {
                title: "Proyecto Ejemplo 1",
                description: "Esta es una descripción de ejemplo para un proyecto. Puedes editar o eliminar este proyecto y agregar los tuyos propios.",
                link: "https://github.com",
                image: "https://via.placeholder.com/300x200?text=Proyecto+Ejemplo"
            },
            {
                title: "Proyecto Ejemplo 2",
                description: "Otro proyecto de ejemplo para mostrar cómo se verán tus proyectos en el portafolio.",
                link: "https://github.com",
                image: null
            }
        );
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        displayProjects();
    }
});
