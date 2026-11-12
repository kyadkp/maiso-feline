// Maison Féline — interactions légères (maquette)

// Révélation au défilement
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('is-open');
  });
}

// Galerie produit : miniatures
const thumbs = document.querySelectorAll('.gallery-thumb');
const mainImage = document.querySelector('.gallery-main');
thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((t) => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
    if (mainImage) {
      const bg = getComputedStyle(thumb).backgroundImage;
      mainImage.style.backgroundImage = bg;
    }
  });
});

// Sélecteur de taille
document.querySelectorAll('.size-option').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('is-disabled')) return;
    document.querySelectorAll('.size-option').forEach((b) => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });
});

// Sélecteur de couleur
document.querySelectorAll('.color-option').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-option').forEach((b) => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
  });
});

// Accordéon fiche produit : premier item ouvert par défaut
const firstAccordionBody = document.querySelector('.accordion-body');
if (firstAccordionBody) firstAccordionBody.style.display = 'block';

document.querySelectorAll('.accordion-head').forEach((head) => {
  head.addEventListener('click', () => {
    const body = head.nextElementSibling;
    const isOpen = body.style.display === 'block';
    document.querySelectorAll('.accordion-body').forEach((b) => (b.style.display = 'none'));
    body.style.display = isOpen ? 'none' : 'block';
  });
});
