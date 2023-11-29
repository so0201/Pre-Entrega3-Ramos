// Variables
const productos = [
    { id: 1, nombre: 'Camisa', precio: 25500 },
    { id: 2, nombre: 'Pantalón', precio: 44000 },
    { id: 3, nombre: 'Zapatos', precio: 30000 },
    { id: 4, nombre: 'Gorra', precio: 15500 },
    { id: 5, nombre: 'Bufanda', precio: 29999 },
    { id: 6, nombre: 'Reloj', precio: 49999 },
    { id: 7, nombre: 'Mochila', precio: 35000 },
    { id: 8, nombre: 'Guantes', precio: 18000 },
    { id: 9, nombre: 'Gafas de sol', precio: 2000 },
    { id: 10, nombre: 'Chaqueta', precio: 60000 },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    actualizarTotal();
});

function mostrarProductos() {
    const productosDiv = document.querySelector('.productos');
    productosDiv.textContent = '';

    productos.forEach(producto => {
        const { nombre, precio, id } = producto;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const nombreProducto = document.createElement('h3');
        nombreProducto.textContent = nombre;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: $${precio}`;

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

        productoDiv.appendChild(nombreProducto);
        productoDiv.appendChild(precioProducto);
        productoDiv.appendChild(botonAgregar);

        productosDiv.appendChild(productoDiv);
    });
}

function actualizarTotal() {
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad || 1), 0);
    const totalSpan = document.querySelector('#total');
    totalSpan.textContent = `$${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.id === producto.id);

    if (productoExistente) {
        productoExistente.cantidad ? (productoExistente.cantidad += 1) : (productoExistente.cantidad = 2);
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    console.log('Producto agregado al carrito:', producto.nombre);
    actualizarTotal();
}

function limpiarCarrito() {
    carrito = [];
    actualizarTotal();
    localStorage.removeItem('carrito');
}
