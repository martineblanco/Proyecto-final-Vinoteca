class Vino {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
        this.imagen = imagen;
    }
}

function precioTotal(producto) {
    return producto.precio * producto.cantidad;
}
