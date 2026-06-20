const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

const storedTheme = localStorage.getItem('theme');
if (storedTheme) root.dataset.theme = storedTheme;

const setTheme = theme => {
  root.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('form');
const modalSucesso = document.getElementById('modal-sucesso');
const btnFecharModal = document.getElementById('btn-fechar-modal');

const showNotification = message => {
  if (modalSucesso) {
    const modalMessage = modalSucesso.querySelector('p');
    if (modalMessage) modalMessage.textContent = message;
    modalSucesso.classList.add('show');
  } else {
    alert(message);
  }
};

if (form) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldIds = ['nome', 'email', 'mensagem'];

  const toggleError = (id, show) => {
    const input = document.getElementById(id);
    const error = document.getElementById(`erro-${id}`);
    if (input) input.classList.toggle('error', show);
    if (error) error.classList.toggle('show', show);
    return show;
  };

  fieldIds.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => toggleError(id, false));
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const hasNameError = toggleError('nome', nome === '');
    const hasEmailError = toggleError('email', !emailRegex.test(email));
    const hasMessageError = toggleError('mensagem', mensagem === '');

    if (hasNameError || hasEmailError || hasMessageError) {
      alert('Por favor, corrija os erros antes de enviar.');
      return;
    }

    form.reset();
    showNotification('Mensagem enviada com sucesso!');
  });
}

if (btnFecharModal) {
  btnFecharModal.addEventListener('click', () => modalSucesso?.classList.remove('show'));
}

if (modalSucesso) {
  modalSucesso.addEventListener('click', event => {
    if (event.target === modalSucesso) {
      modalSucesso.classList.remove('show');
    }
  });
}
