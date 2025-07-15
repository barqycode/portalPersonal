// Validación de Formulario mejorada
document.getElementById('contact-form').addEventListener('submit', (e) => {
  const email = document.querySelector('input[name="email"]').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    
    // Mostrar error elegante en lugar de alert
    const errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = 'Por favor ingresa un email válido';
    errorElement.style.color = 'var(--accent)';
    errorElement.style.marginTop = '10px';
    
    const emailInput = document.querySelector('input[name="email"]');
    if (!document.querySelector('.form-error')) {
      emailInput.insertAdjacentElement('afterend', errorElement);
    }
    
    // Resaltar campo inválido
    emailInput.style.borderColor = 'var(--accent)';
    setTimeout(() => {
      emailInput.style.borderColor = '';
    }, 2000);
  }
});

// Sistema de Temas Mejorado
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

function updateTheme(isDark) {
  if (isDark) {
    html.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    darkModeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    
    // Actualizar Three.js si existe
    if (window.spiralMaterial) {
      window.spiralMaterial.color.setHex(0x00a8ff); // Azul para modo oscuro
    }
  } else {
    html.setAttribute('data-theme', 'light');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    
    if (window.spiralMaterial) {
      window.spiralMaterial.color.setHex(0x9c27b0); // Morado para modo claro
    }
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
  // Forzar repintado para navegadores WebKit
  document.body.style.display = 'none';
  document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
}

// Alternar tema con animación suave
darkModeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme') || 'dark';
  
  // Deshabilitar transiciones durante el cambio
  document.documentElement.style.transition = 'none';
  updateTheme(currentTheme === 'light');
  
  // Restaurar transiciones después de un frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.style.transition = '';
    });
  });
});

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', () => {
  // Cargar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Aplicar tema con delay para evitar flash en carga
  setTimeout(() => {
    updateTheme(savedTheme ? savedTheme === 'dark' : systemPrefersDark);
  }, 10);
  
  // Escuchar cambios en la preferencia del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Solo si no hay preferencia guardada
      updateTheme(e.matches);
    }
  });
});

// Mejorar accesibilidad del tema
darkModeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    darkModeToggle.click();
  }
});