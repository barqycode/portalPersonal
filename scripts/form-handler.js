// Validación de Formulario mejorada
document.getElementById('contact-form').addEventListener('submit', (e) => {
  const email = document.querySelector('input[name="email"]').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    e.preventDefault();
    
    // Mostrar error elegante
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
      if (document.querySelector('.form-error')) {
        document.querySelector('.form-error').remove();
      }
    }, 3000);
  }
});
