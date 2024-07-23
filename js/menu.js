const menu = document.querySelector('.seleccion-articulos-lista');

function abrirMenu() {
  if (!document.querySelector('.cerrar-menu')) {
    const cruz = document.createElement('div');
    cruz.innerHTML = `<i class="bi bi-x-lg"></i></button>`;
    cruz.classList.add('cerrar-menu');
    menu.appendChild(cruz);
    menu.classList.add('menu');
  }
  menu.classList.add('menu');
  const cerrarMenu = document.querySelector('.cerrar-menu');
  cerrarMenu.addEventListener('click', () => {
    menu.classList.remove('menu');
  });
}


botonesCategorias.forEach(boton => boton.addEventListener("click",() => {
  menu.classList.remove('menu'); 
} ) )