// ====================================================================================
// Código específico para la página "Nosotros"
// Carrusel de imágenes con dots
// ====================================================================================
const slides = document.querySelectorAll('.fade-slide');
const dots = document.querySelectorAll('.dot');
const carousel = document.getElementById('fadeCarousel');
let slideIndex = 0;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    dots[i].classList.toggle('active', i === index);
  });
  slideIndex = index;
}

function nextSlide() {
  showSlide((slideIndex + 1) % slides.length);
}

function prevSlide() {
  showSlide((slideIndex - 1 + slides.length) % slides.length);
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

if (dots.length > 0 && slides.length > 0) {
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-index')));
    });
  });
  showSlide(slideIndex);
  startAutoSlide();
}

if (carousel) {
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);
}
// ====================================================================================
// FIN: Código para "Nosotros"
// ====================================================================================


// ====================================================================================
// Código compartido para páginas con formulario de contacto
// ====================================================================================
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  if (typeof emailjs !== 'undefined') {
    emailjs.init('_j1CTSDv_KGxWu-br');

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Envía a admin
        emailjs.sendForm('service_pum6v1o', 'template_wgl460j', form)
          .then(() => {
            document.getElementById("popup-message").textContent = "¡Mensaje enviado correctamente!";
            document.getElementById("popup").classList.remove("hidden");
            form.reset();
            grecaptcha.reset();
          }, (error) => {
            document.getElementById("popup-message").textContent = "Ocurrió un error. Intenta de nuevo.";
            document.getElementById("popup").classList.remove("hidden");
          });

        // Envía al usuario
        emailjs.sendForm('service_pum6v1o', 'template_penh2la', form)
          .catch((error) => {
            console.error("Error al enviar al usuario:", error);
          });
      });
    }
  }
});

// Código para cerrar el popup del formulario
function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}
// ====================================================================================
// FIN: Código de formulario de contacto
// ====================================================================================

// ====================================================================================
// Código para selector de terapia (dropdown personalizado)
// ====================================================================================
const terapiaInput = document.getElementById('terapia-input');
const dropdown = document.getElementById('dropdown-options');

if (terapiaInput && dropdown) {
  terapiaInput.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
      terapiaInput.value = option.textContent;
      terapiaInput.dispatchEvent(new Event('input'));
      dropdown.style.display = 'none';
    });
  });

  document.addEventListener('click', (e) => {
    if (!document.querySelector('.dropdown-wrapper').contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}
// ====================================================================================
// FIN: Código dropdown personalizado
// ====================================================================================


// ====================================================================================
// Código carrousel Inicio
// ====================================================================================
const track = document.getElementById('carousel');

if (track) {
  const images = track.querySelectorAll('img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let index = 0;

  function updateCarousel() {
    const offset = index * (images[0].offsetWidth + 20);
    track.style.transform = `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
}

// ====================================================================================
// FIN: Código carrousel Inicio
// ====================================================================================

// ====================================================================================
// Código Entradas Blog
// ====================================================================================
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', (e) => {
    // Evita que el clic en el botón de cerrar dispare el overlay
    if (e.target.closest('.overlay-close')) return;

    const overlay = card.querySelector('.overlay-text');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.overlay-close').forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // evita que el cierre vuelva a abrir el overlay
    const overlay = button.closest('.overlay-text');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});
// ====================================================================================
// FIN: Código Entradas Blog
// ====================================================================================