window.addEventListener("DOMContentLoaded", () => {
    loadHTML("navbar", "../components/navbar.html", setupNavbar);

    loadHTML("footer", "../components/footer.html", () => {
        const path = window.location.pathname;
        if (
            path.includes("politica-privacidad") ||
            path.includes("servicios") || path.includes("blog")
        ) {
            const footer = document.querySelector("footer");
            if (footer) {
                footer.classList.add("footer-shadow");
            }
        }
    });
});

function loadHTML(elementId, url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar ${url}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = data;
                if (callback) callback();
            }
        })
        .catch(error => {
            console.error("Error al cargar HTML:", error);
        });
}



function setupNavbar() {
  const button = document.querySelector('.dropdown-button');
  const menu = document.getElementById('dropdownMenu');

  if (!button || !menu) return;

  let visible = false;

  button.addEventListener('click', () => {
    visible = !visible;
    menu.classList.toggle('show', visible);
    button.innerHTML = visible ? '✖' : '☰';
  });

  document.addEventListener('click', (e) => {
    if (!button.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('show');
      visible = false;
      button.innerHTML = '☰';
    }
  });

  // Activar pestaña actual
  document.querySelectorAll('.item-options-laptop a, .dropdown-content a').forEach(link => {
    const currentPath = window.location.pathname.replace(/\/+$/, '');
    const linkPath = link.pathname.replace(/\/+$/, '');
    if (currentPath === linkPath) {
      link.classList.add('active');
    }
  });
}
