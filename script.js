const vino1 = new Vino(1, "Trumpeter", 2500, "trumpeter.jpeg" )
const vino2 = new Vino(2, "Luigi Bosca", 1000, "luigi bosca.jpeg")
const vino3 = new Vino(3, "Cobos", 1500, "cobos.jpg")
const vino4 = new Vino(4, "Rutini", 2000, "rutini.jpeg")
const vino5 = new Vino(5, "Emilia Red", 1300, "emilia red.jpeg")
const vino6 = new Vino(6, "familia schroede", 1800, "4.jpg")

let productos = [vino1, vino2, vino3, vino4, vino5, vino6];



localStorage.getItem("compra")? productos = JSON.parse(localStorage.getItem("compra")):localStorage.setItem("compra", JSON.stringify(productos))


let tabla = document.getElementById("items");
let mostrarTotal = document.getElementById("total");
const vaciar = document.getElementById("vaciar");
const btnCarrito = document.getElementById("btnCarrito");
const comprar = document.getElementById("comprar");


let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");
let boton4 = document.getElementById("boton4");
let boton5 = document.getElementById("boton5");
let boton6 = document.getElementById("boton6");

const botones = [boton1, boton2, boton3, boton4, boton5, boton6];


botones.forEach((btn, i) => {
    btn.onclick = () => { clickBoton(productos, i) }
})

// Al hacer click al boton vaciar carrito, vacia la lista de productos en una tabla
vaciar.onclick = () => {
    for (producto of productos) {
        producto.cantidad = 0;
    }
    tabla.innerHTML = "";
    mostrarTotal.innerHTML = `El carrito esta vacio`;
    localStorage.setItem("compra", JSON.stringify(productos))
    Swal.fire({
        title: 'Estás seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    })
};

// Al hacer click al boton comprar, se realiza la compra
comprar.onclick= ()=>{
    Swal.fire({
        title: 'Estás seguro de realizar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {  
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Compra realizada!',
                icon: 'success',
                text: 'La compra ha sido realizada con exito!'
            })
            for (producto of productos) {
                producto.cantidad = 0;
            }
            tabla.innerHTML = "";
            mostrarTotal.innerHTML = `El carrito esta vacio`;
        }
    })
}


// Al hacer click al boton Agregar carrito Muestra los productos en una tabla dentro del carrito
function clickBoton(productos, i) {
    productos[i].cantidad++;
    localStorage.setItem("compra", JSON.stringify(productos))
    Toastify({
        text: "Producto Cargado!",
        duration: 1500,
        gravity: "bottom",
        position: "right"
    }).showToast();
}

// Muestra los productos en una tabla dentro del carrito
btnCarrito.addEventListener("click", () => {
    let total = 0;
    tabla.innerHTML = "";
    for (const product of productos) {
        let {id,nombre,precio,cantidad,imagen} = product
        if (cantidad > 0) {
            tabla.innerHTML += `<th><img src="./imagenes/${imagen}" class="card-img-top img-fluid" alt="trumpeter"></th>
                        <th>${nombre}</th>
                        <th>${cantidad}</th>     
                      <th>$${precio}</th>
                      <th><button id="btn${id}" class="btn btn-danger">Eliminar</button></th>
                      <hr>`;
            total += precioTotal(product)
        }
    }
    //Si hay productos muestra el El precio total
   mostrar(total)
    eliminarProducto(productos)
})


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


function mostrar(total){
    total > 0? mostrarTotal.innerHTML = `$${total}`: mostrarTotal.innerHTML = `El carrito esta vacio`
}