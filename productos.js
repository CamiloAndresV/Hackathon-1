//Son 6 regiones, 2 platos por region

const productos = [
    { id: 1, nombre: "Arroz con coco y pescado frito", descripcion: "Pescado acompañado de arroz con coco y patacones", precio: 28000 },
    { id: 2, nombre: "Mote de queso", descripcion: "Sopa de ñame con queso costeño", precio: 18000 },
    { id: 3, nombre: "Bandeja paisa", descripcion: "Plato tradicional antioqueño con fríjoles, arroz, carne molida, chicharrón, huevo, aguacate, arepa y plátano maduro", precio: 32000 },
    { id: 4, nombre: "Sobrebarriga en salsa", descripcion: "Carne de res cocinada lentamente en salsa, acompañada de papa y arroz", precio: 27000 },
    { id: 5, nombre: "Arroz atollado", descripcion: "Arroz húmedo preparado con carnes y otros ingredientes", precio: 25000 },
    { id: 6, nombre: "Tapao de pescado", descripcion: "Plato de pescado cocido con ingredientes regionales", precio: 26000 },
    { id: 7, nombre: "Mamona o ternera a la llanera", descripcion: "Carne asada tradicionalmente a la brasa", precio: 35000 },
    { id: 8, nombre: "Hervido de gumarra", descripcion: "Caldo tradicional preparado con gallina criolla en algunas zonas llaneras", precio: 22000 },
    { id: 9, nombre: "Pirarucú", descripcion: "Pescado amazónico preparado asado, frito o en guisos", precio: 30000 },
    { id: 10, nombre: "Patarasca de pescado", descripcion: "Pescado amazónico sazonado, envuelto en hojas y cocinado al fuego", precio: 28000 },
    { id: 11, nombre: "Rondón", descripcion: "Preparación de pescado o mariscos con leche de coco, tubérculos y otros ingredientes", precio: 32000 },
    { id: 12, nombre: "Rice and beans", descripcion: "Arroz con fríjoles preparado con leche de coco y condimentos", precio: 20000 },
];

function agregarProductos(productos){
    let catalogoProductos=document.getElementById("catalogo-productos")
    catalogoProductos.innerHTML = ""
     for (let i = 0; i < productos.length; i++) {
        let productoActual=productos[i] 
        //creacion de la tarjeta
        let columna=document.createElement("div")
        columna.classList.add("col-12 col-md-6")
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        let bodyTarjeta=document.createElement("div")
        bodyTarjeta.classList.add("card-body")

        //creacion de la tarjeta(descripcion y todo lo q lleva como tal)
        let nombreProducto=document.createElement("h4")
        nombreProducto.textContent=productoActual.nombre
        let descripcionProducto=document.createElement("p")
        descripcionProducto.textContent=productoActual.descripcion
        let precioProducto=document.createElement("p")
        precioProducto.textContent=productoActual.precio

        //agregar al html en el cuerpo de la tarjeta
        bodyTarjeta.appendChild(nombreProducto);
        bodyTarjeta.appendChild(descripcionProducto);
        bodyTarjeta.appendChild(precioProducto);

        //agregar al html el cuerpo a la tarjeta
        tarjeta.appendChild(bodyTarjeta)

        //agregar al html la tarjeta a la columna
        columna.appendChild(tarjeta)

        //agregar al html la columna al catalogo
        catalogoProductos.appendChild(columna)

    }
}
agregarProductos(productos)