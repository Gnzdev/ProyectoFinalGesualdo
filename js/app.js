const vidriera = document.getElementById("vidriera");
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")

const carritoLS = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}
let carritoContent = ``;

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// Creando las tarjetas

const vidrieraItems = async () => {
    let res = await fetch("vidriera.json");
    let data = await res.json();
    data.forEach((objeto) => {
        let item = document.createElement("div");
        item.className = "itemCard";
        item.innerHTML = `
            <img src="${objeto.foto}">
            <h3>${objeto.nombre}</h3>
            <h5 class="precio">$${objeto.precio}.00</h5>
            <p class="tipoObjeto">${objeto.tipo}</p>
            <p class="stock">${objeto.stock} Unidades en Stock</p>
        `;
        
        vidriera.append(item);
    
        let comprar = document.createElement("button")
        comprar.innerText = "Comprar";
        item.append(comprar);
    // Pusheando items al carrito + Unidades en caso de sumarse
        comprar.addEventListener("click", () =>{
            const repetido = carrito.some((sumarObjeto) => sumarObjeto.id === objeto.id
            );
    
            if(repetido) {
                carrito.map( item => {
                    if (item.id === objeto.id && item.cantidad < objeto.stock) {
                        item.cantidad++;
                        carritoLS();
                    } else if(item.id === objeto.id && item.cantidad == objeto.stock) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ups...',
                            text: '¡No nos queda Stock!',
                            footer: '<a href="https://www.youtube.com/watch?v=0Akp1v6QrYA&ab_channel=LiveBetterMedia-Espa%C3%B1ol">¡OH NO! Ahora estoy estresado y necesito relajarme urgentemente!</a>'
                          })
                    }
                });
            } else {
                carrito.push({
                id: objeto.id,
                nombre: objeto.nombre,
                foto: objeto.foto,
                precio: Number(`${objeto.precio * objeto.cantidad}`),
                stock: objeto.stock,
                tipo: objeto.tipo,
                cantidad: objeto.cantidad,
                });
            console.log(carrito);
            
        };
        carritoLS();
    });
    });
};
vidrieraItems();

// Viendo el carrito

    const mostrarCarrito = () => {
    // verCarrito.addEventListener("click", () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Tu carrito:</h1>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = "×";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);
// Agregando elementos
    carrito.forEach((obj) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
    <img src="${obj.foto}">
        <h3>${obj.nombre}</h3>
        <p>$${obj.precio * obj.cantidad}</p>
        <span class="restar"> - </span>
        <p>${obj.cantidad} Unidades</p>
        <span class="sumar"> + </span>
    `;
    // <span class="borrarProducto"> 🧨 </span>
    modalContainer.append(carritoContent);
    let restar = carritoContent.querySelector(".restar");
restar.addEventListener("click", () => {
    if(obj.cantidad !== 1) {
        obj.cantidad--;
        mostrarCarrito();
        carritoLS();
    }
})
let sumar = carritoContent.querySelector(".sumar");
sumar.addEventListener("click", () => {
    if(obj.cantidad < obj.stock) {
        obj.cantidad++;
        mostrarCarrito();
        carritoLS();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: '¡No nos queda Stock!',
            footer: '<a href="https://www.youtube.com/watch?v=0Akp1v6QrYA&ab_channel=LiveBetterMedia-Espa%C3%B1ol">¡OH NO! Ahora estoy estresado y necesito relajarme urgentemente!</a>'
          })
    }
});
    });
// Total del carrito
    const totalCarrito = carrito.reduce((acc, obj) => acc + obj.precio * obj.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `<h5> Total a pagar: $${totalCarrito}.</h5>`;
    modalContainer.append(totalCompra); 

// Vaciando el cashito y cerrando el modal
    const vaciarCarrito = document.createElement("button");
    vaciarCarrito.className = "vaciar-carrito";
    vaciarCarrito.innerText = "Vaciar carrito";
    
    vaciarCarrito.addEventListener("click", () => {
        carrito = [];
        modalContainer.style.display = "none";
        localStorage.removeItem("carrito"); 

});

modalContainer.append(vaciarCarrito); 
// Comprar
const comprarCarrito = document.createElement("button");
    comprarCarrito.className = "comprar-carrito";
    comprarCarrito.innerText = "Comprar carrito";
    
    comprarCarrito.addEventListener("click", () => {
        if(document.querySelector(".gracias-compra")){
            graciasCompra.innerHTML.style.display = "bold";
        } else{
        const graciasCompra = document.createElement("div");
        graciasCompra.className = "gracias-compra";
        graciasCompra.innerHTML = `
        <h3>¡Muchas gracias por tu compra!</h3>
        `
    modalContainer.append(graciasCompra);}
});

modalContainer.append(comprarCarrito); 
};
// }

verCarrito.addEventListener("click", mostrarCarrito);


// LocalStorage
JSON.parse(localStorage.getItem("carrito"));