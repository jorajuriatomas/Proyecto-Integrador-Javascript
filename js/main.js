const productos = [
  {
    id: 'auricular-1',
    titulo: 'Auricular X',
    imagen: 'img/auriculares/auricular-1.jpg',
    categoria: {
      nombre: 'Auriculares',
      id: 'auriculares',
    },
    precio: 50000,
  },
  {
    id: 'auricular-2',
    titulo: 'Auricular Logitech',
    imagen: 'img/auriculares/auricular-2.jpg',
    categoria: {
      nombre: 'Auriculares',
      id: 'auriculares',
    },
    precio: 200000,
  },
  {
    id: 'auricular-3',
    titulo: 'Auricular RedDragon Rojo',
    imagen: 'img/auriculares/auricular-3.jpg',
    categoria: {
      nombre: 'Auriculares',
      id: 'auriculares',
    },
    precio: 80000,
  },
  {
    id: 'auricular-4',
    titulo: 'Auricular RedDragon Rosa',
    imagen: 'img/auriculares/auricular-4.jpg',
    categoria: {
      nombre: 'Auriculares',
      id: 'auriculares',
    },
    precio: 80000,
  },
  {
    id: 'auricular-5',
    titulo: 'Auricular HX',
    imagen: 'img/auriculares/auricular-5.jpg',
    categoria: {
      nombre: 'Auriculares',
      id: 'auriculares',
    },
    precio: 600000,
  },
  {
    id: 'mouse-1',
    titulo: 'Mouse HX',
    imagen: 'img/mouse/mouse-1.jpg',
    categoria: {
      nombre: 'Mouse',
      id: 'mouse',
    },
    precio: 40000,
  },
  {
    id: 'mouse-2',
    titulo: 'Mouse Predatore',
    imagen: 'img/mouse/mouse-2.jpg',
    categoria: {
      nombre: 'Mouse',
      id: 'mouse',
    },
    precio: 30000,
  },
  {
    id: 'mouse-3',
    titulo: 'Mouse Logitech',
    imagen: 'img/mouse/mouse-3.jpg',
    categoria: {
      nombre: 'Mouse',
      id: 'mouse',
    },
    precio: 80000,
  },
  {
    id: 'mouse-4',
    titulo: 'Mouse RedDragon',
    imagen: 'img/mouse/mouse-4.jpg',
    categoria: {
      nombre: 'Mouse',
      id: 'mouse',
    },
    precio: 35000,
  },
  {
    id: 'mouse-5',
    titulo: 'Mouse GALAX',
    imagen: 'img/mouse/mouse-5.jpg',
    categoria: {
      nombre: 'Mouse',
      id: 'mouse',
    },
    precio: 20000,
  },
  {
    id: 'teclado-1',
    titulo: 'Teclado RedDragon',
    imagen: 'img/teclados/teclado-1.jpg',
    categoria: {
      nombre: 'Teclados',
      id: 'teclados',
    },
    precio: 25000,
  },
  {
    id: 'teclado-2',
    titulo: 'Teclado Logitech X',
    imagen: 'img/teclados/teclado-2.jpg',
    categoria: {
      nombre: 'Teclados',
      id: 'teclados',
    },
    precio: 70000,
  },
  {
    id: 'teclado-3',
    titulo: 'Teclado Logitech',
    imagen: 'img/teclados/teclado-3.jpg',
    categoria: {
      nombre: 'Teclados',
      id: 'teclados',
    },
    precio: 60000,
  },
  {
    id: 'teclado-4',
    titulo: 'Teclado RedDragon Pink',
    imagen: 'img/teclados/teclado-4.jpg',
    categoria: {
      nombre: 'Teclados',
      id: 'teclados',
    },
    precio: 30000,
  },
  {
    id: 'teclado-5',
    titulo: 'Teclado Logitech PRO X',
    imagen: 'img/teclados/teclado-5.jpg',
    categoria: {
      nombre: 'Teclados',
      id: 'teclados',
    },
    precio: 75000,
  },
];

const contenedorProductos = document.getElementById('contenedorProductos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.getElementById('tituloPrincipal');
let botonesAgregar = document.querySelector('.articulo-compra');
const cantidad = document.getElementById('cantidad');

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = '';

  productosElegidos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('articulo');
    div.innerHTML = `
            <img class="articulo-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                        <div class="articulo-info">
                            <h3 class="articulo-nombre">${producto.titulo}</h3>
                            <p class="articulo-costo">$${producto.precio}</p>
                            <button onclick="agregarAlCarrito(this)" class="articulo-compra" id="${producto.id}">Agregar</button>
                        </div>
        `;
    contenedorProductos.append(div);
  });
  
}

cargarProductos(productos);

function activarTab(tab){
  botonesCategorias.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');

    if (tab.id != 'todos') {
      const productoCategoria = productos.find(producto => producto.categoria.id === tab.id);
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(producto => producto.categoria.id === tab.id);
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = 'Todos los productos';
      cargarProductos(productos);
    }
}



let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem('productosEnCarrito'));
if (productosEnCarritoLS) {
  productosEnCarrito = productosEnCarritoLS;
  actualizarCantidadDeCompras();
} else {
  productosEnCarrito = [];
}

function agregarAlCarrito(e) {
  const idBoton = e.id;
  const productoAgregado = productos.find(producto => producto.id === idBoton);

  if (productosEnCarrito.some(producto => producto.id === idBoton)) {
    const productoExistente = productosEnCarrito.find(producto => producto.id === idBoton);
    productoExistente.cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarCantidadDeCompras();

  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
}

function actualizarCantidadDeCompras() {
  cantidad.innerHTML = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
}


