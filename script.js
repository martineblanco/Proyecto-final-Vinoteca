let tabla = document.getElementById("items");
let mostrarTotal = document.getElementById("total");
const vaciar = document.getElementById("vaciar");
const btnCarrito = document.getElementById("btnCarrito");
const comprar = document.getElementById("comprar");
let divProductos = document.getElementById("productos")

let carrito = []
let vinos = cargaProductos();

vinos.then(data =>{
    divProductos.innerHTML= "";
    data.forEach((v,i)=>{
        divProductos.innerHTML += `<div id="productos${v.id}" class="card mb-3" style="width: 18rem;">
        <img src="./imagenes/${v.imagen}" class="card-img-top img-fluid mb-2" alt="${v.nombre}">
        <div class="card-body">
            <h5 class="card-title">${v.nombre}</h5>
            <p class="card-text">Precio: ${v.precio}</p>
            <a class="btn btn-primary" id="boton${v.id}">Agregar Carrito</a>
        </div>
    </div>`
    carrito[i]= new Carrito(v.id, v.nombre, v.precio, v.imagen)
    })  
    localStorage.getItem("compra")? productos = JSON.parse(localStorage.getItem("compra")):localStorage.setItem("compra", JSON.stringify(productos))
     
    let boton1 = document.getElementById("boton1");
    let boton2 = document.getElementById("boton2");
    let boton3 = document.getElementById("boton3");
    let boton4 = document.getElementById("boton4");
    let boton5 = document.getElementById("boton5");
    let boton6 = document.getElementById("boton6");
    
    const botones = [boton1, boton2, boton3, boton4, boton5, boton6];
    
    botones.forEach((btn, i) => {
        btn.onclick = () => { clickBoton(carrito, i) }
    })
})


// Al hacer click al boton vaciar carrito, vacia la lista de productos en una tabla
vaciar.onclick = () => {
    Swal.fire({
        title: 'Estás seguro de vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {  
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Carrito vacio!',
                icon: 'success',
            })
            for (producto of carrito) {
                producto.cantidad = 0;
            }
            tabla.innerHTML = "";
            mostrarTotal.innerHTML = `El carrito esta vacio`;
            localStorage.setItem("compra", JSON.stringify(carrito))
        }
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
            for (producto of carrito) {
                producto.cantidad = 0;
            }
            tabla.innerHTML = "";
            mostrarTotal.innerHTML = `El carrito esta vacio`;
            localStorage.setItem("compra", JSON.stringify(carrito))
        }
    })
}

// Muestra los productos en una tabla dentro del carrito
btnCarrito.addEventListener("click", () => {
    let total = 0;
    tabla.innerHTML = "";
    for (const product of carrito) {
        let {id,nombre,precio,cantidad,imagen} = product
        if (cantidad > 0) {
            tabla.innerHTML += `<th><img src="./imagenes/${imagen}" class="card-img-top img-fluid" alt="${nombre}"></th>
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
    eliminarProducto(carrito)
})
