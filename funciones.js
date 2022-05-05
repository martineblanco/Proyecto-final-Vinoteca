// Lista de Productos desde el JSON
async function cargaProductos () {
    let promesa = await fetch("./vinos.json")
    let productosJson = await promesa.json()
    return productosJson
    
}


// Al hacer click al boton Agregar carrito Muestra los productos en una tabla dentro del carrito
function clickBoton(productos, i) {
    productos[i].cantidad++;
    localStorage.setItem("compra", JSON.stringify(productos))
    Toastify({
        text: "Producto Cargado!",
        duration: 1500,
        gravity: "bottom",
        style: {
            background: "#5bb888",
          },
        position: "right"
    }).showToast();
}


// Elimina de una tabla el producto seleccionado
function eliminarProducto(productos) {
    productos.forEach((productoSeleccionado, i) => {
        if (productoSeleccionado.cantidad > 0) {
            document.getElementById(`btn${productoSeleccionado.id}`).addEventListener("click", () => {
                productoSeleccionado.cantidad--;
                let total = 0;
                tabla.innerHTML = "";
                Toastify({
                    text: "Producto Eliminado!",
                    duration: 1500,
                    gravity: "top",
                    style: {
                        background: "#f66",
                      },
                    position: "right",
                }).showToast();
                for (const product of productos) {
                    if (product.cantidad > 0) {
                        tabla.innerHTML += `<th><img src="./imagenes/${product.imagen}" class="card-img-top img-fluid" alt="trumpeter"></th>
                        <th>${product.nombre}</th>
                        <th>${product.cantidad}</th>     
                      <th>$${product.precio}</th>
                      <th><button id="btn${product.id}" class="btn btn-danger">Eliminar</button></th>
                      <hr>`;
                        total += precioTotal(product)
                    }
                }
               mostrar(total)
                eliminarProducto(productos)
                localStorage.setItem("compra", JSON.stringify(productos))
            })
        }
    })
}


// Funcion que muestra el total de la operacion realizada o vacio si no agrega ningun producto a la lista
function mostrar(total){
    total > 0? mostrarTotal.innerHTML = `$${total}`: mostrarTotal.innerHTML = `El carrito esta vacio`
}