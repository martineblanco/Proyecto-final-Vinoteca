// Lista de Productos desde el JSON
async function cargaProductos () {
    let promesa = await fetch("./vinos.json")
    let productosJson = await promesa.json()
    return productosJson
    
}

// funcion que actualiza la cantidad de los productos
function actualizar (carrito){
    let cantidad=0
    for(vino of carrito){
        if(vino.cantidad>0){
            cantidad+= vino.cantidad
        }
    }
    if(cantidad>0){
       document.getElementById("total-carrito").innerHTML=cantidad
    }
    
}

// Funcion clickBoton que muestra los productos agregados al carrito
function clickBoton(productos, i) {
    const cantidad = document.getElementById(`cant-${i}`)
    productos[i].cantidad = productos[i].cantidad + parseInt(cantidad.value);
    sumarTotalCarro(parseInt(cantidad.value))
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
     cantidad.value = 1
}

// Funcion que suma la cantidad de los productos en la tabla del Carrito
function sumarTotalCarro(productosAgregados) {
    const totalCarrito = document.getElementById('total-carrito').innerHTML
    const totalAnterior = totalCarrito ? parseInt(totalCarrito) : 0
    const nuevoTotal = totalAnterior + productosAgregados
    document.getElementById('total-carrito').innerHTML = nuevoTotal
}

// Funcion que resta la cantidad de los productos en la tabla del Carrito
function restarTotalCarro() {
    let totalCarrito = parseInt(document.getElementById('total-carrito').innerHTML)
    totalCarrito--
    totalCarrito==0 ?  document.getElementById('total-carrito').innerHTML="": 
    document.getElementById('total-carrito').innerHTML = totalCarrito
}


// Funcion que elimina de una tabla el producto seleccionado
function eliminarProducto(productos) {
    productos.forEach((productoSeleccionado, i) => {
        if (productoSeleccionado.cantidad > 0) {
            document.getElementById(`btn${productoSeleccionado.id}`).addEventListener("click", () => {
                productoSeleccionado.cantidad--;
                restarTotalCarro()
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