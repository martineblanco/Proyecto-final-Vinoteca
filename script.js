let tabla = document.getElementById("items");
let mostrarTotal = document.getElementById("total");
const vaciar = document.getElementById("vaciar");
const btnCarrito = document.getElementById("btnCarrito");
const comprar = document.getElementById("comprar");
let divProductos = document.getElementById("productos")
let carrito = []
//llamado de la funcion que trae los productos desde el JSON
let vinos = cargaProductos();


vinos.then(data => {
    divProductos.innerHTML = "";
    data.forEach((v, i) => {
        divProductos.innerHTML += `<div id="productos${v.id}" class="card mb-3 col-md-4 cardProductos" style="width: 18rem;">
        <img src="./imagenes/${v.imagen}" class="card-img-top img-fluid mb-2" alt="${v.nombre}">
            <div class="card-body">
                <h5 class="card-title">${v.nombre}</h5>
                <p class="card-text">Precio: $${v.precio}</p>
                <div class= "cantidadProductos"> 
                    <input type="number" id="cant-${v.id}" value=1 min=1 class="colorCant"/>
                    <a class="btn btn-primary" id="boton${v.id}">Agregar al Carrito</a>
                </div> 
        </div>
    </div>`
        carrito[i] = new Carrito(v.id, v.nombre, v.precio, v.imagen)
    })
    //Trae datos del storage o los carga
    localStorage.getItem("compra") ? carrito = JSON.parse(localStorage.getItem("compra")) : localStorage.setItem("compra", JSON.stringify(carrito))

    actualizar(carrito);


    let boton0 = document.getElementById("boton0");
    let boton1 = document.getElementById("boton1");
    let boton2 = document.getElementById("boton2");
    let boton3 = document.getElementById("boton3");
    let boton4 = document.getElementById("boton4");
    let boton5 = document.getElementById("boton5");
    let boton6 = document.getElementById("boton6");
    let boton7 = document.getElementById("boton7");
    let boton8 = document.getElementById("boton8");
    let boton9 = document.getElementById("boton9");
    let boton10 = document.getElementById("boton10");
    let boton11 = document.getElementById("boton11");

    const botones = [boton0, boton1, boton2, boton3, boton4, boton5, boton6, boton7, boton8, boton9, boton10, boton11];

    botones.forEach((btn, i) => {
        btn.onclick = () => { clickBoton(carrito, i) }
    })
})


// vaciar onclick, vacia la lista de productos del carrito
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
            document.getElementById('total-carrito').innerHTML=""
            mostrarTotal.innerHTML = `El carrito esta vacio`;
            localStorage.setItem("compra", JSON.stringify(carrito))
        }
    })

};


// comprar onclick, accion que realiza la compra de los productos
comprar.onclick = () => {
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
                text: 'La compra se ha realizado con exito!'
            })
            for (producto of carrito) {
                producto.cantidad = 0;
            }
            tabla.innerHTML = "";
            document.getElementById('total-carrito').innerHTML=""
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
        const { id, nombre, precio, cantidad, imagen } = product
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
