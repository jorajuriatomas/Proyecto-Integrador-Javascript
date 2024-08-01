const productosEnCarritoSeleccionados = JSON.parse(localStorage.getItem('productosEnCarrito'));
const contenedorCarritoVacio = document.getElementById('carritoVacio');
const contenedorCarritoProductos = document.getElementById('carritoProductos');
const contenedorCarritoAcciones = document.getElementById('carritoAcciones');
const contenedorCarritoComprado = document.getElementById('carritoComprado');
let botonEliminarProducto = document.querySelectorAll('.carrito-articulo-eliminar');

function cargarProductosCarrito() {
  if (productosEnCarritoSeleccionados && productosEnCarritoSeleccionados.length > 0) {
    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.remove('disabled');
    contenedorCarritoAcciones.classList.remove('disabled');
    contenedorCarritoComprado.classList.add('disabled');

    contenedorCarritoProductos.innerHTML = '';

    productosEnCarritoSeleccionados.forEach(producto => {
      const div = document.createElement('div');
      div.classList.add('carrito-articulo');
      div.innerHTML = `
     <img class="carrito-articulo-imagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="carrito-articulo-nombre">
          <h3>${producto.titulo}</h3>
      </div>
      <div class="carrito-articulo-cantidad">
          <small>Cantidad</small>
          <p>${producto.cantidad}</p>
      </div>
      <div class="carrito-articulo-costo">
          <small>Costo:</small>
          <p>$${producto.precio}</p>
      </div>
      <div class="carrito-artiuclo-subtotal">
          <small>Subtotal:</small>
          <p>$${producto.precio * producto.cantidad}</p>
      </div>
      <button onclick="eliminarDelCarrito(this)" id=${producto.id} class="carrito-articulo-eliminar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-trash" viewBox="0 0 16 16">
              <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg></button>
  `;

      contenedorCarritoProductos.appendChild(div);
      actualizarTotal();
    });
    return;
  }
  contenedorCarritoVacio.classList.remove('disabled');
  contenedorCarritoProductos.classList.add('disabled');
  contenedorCarritoAcciones.classList.add('disabled');
  contenedorCarritoComprado.classList.add('disabled');
}

cargarProductosCarrito();

function eliminarDelCarrito(e) {
  const productoAEliminar = productosEnCarritoSeleccionados.find(producto => producto.id === e.id);
  const index = productosEnCarritoSeleccionados.indexOf(productoAEliminar);
  productosEnCarritoSeleccionados.splice(index, 1);
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarritoSeleccionados));
  cargarProductosCarrito();
}

function vaciarCarrito() {
  productosEnCarritoSeleccionados.splice(0, productosEnCarritoSeleccionados.length);
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarritoSeleccionados));
  cargarProductosCarrito();
}

function actualizarTotal() {
  const totalCalculado = productosEnCarritoSeleccionados.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
  const numeroConMilesimas = totalCalculado.toLocaleString('de-DE');
  total.innerText = `$${numeroConMilesimas}`;
}

function comprarCarrito() {
  productosEnCarritoSeleccionados.splice(0, productosEnCarritoSeleccionados.length);
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarritoSeleccionados));

  contenedorCarritoVacio.classList.add('disabled');
  contenedorCarritoProductos.classList.add('disabled');
  contenedorCarritoAcciones.classList.add('disabled');
  contenedorCarritoComprado.classList.remove('disabled');
}