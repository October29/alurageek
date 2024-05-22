async function listAPI() {
    const connectionAPI = await fetch('http://localhost:3004/products');
    const dataAPI = connectionAPI.json();
    console.log(dataAPI);
    return dataAPI
};

async function createProduct(name, size, price, stock, url) {
    const connetion = await fetch('http://localhost:3004/products',{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            name: name,
            size: size,
            price: price,
            stock: `${stock}`,
            url: url
        })
        
    });
    const dataAPI = connetion.json();

    if(!connetion.ok) {
        throw new Error('Ha ocurrido un error al ingresar el producto');
    }
    console.log(dataAPI.id);
    return dataAPI.id;
};

async function deleteProdut(product) {
    const connetion = await fetch(`http://localhost:3004/products/${product}`, {
        method: 'DELETE'
    });
    alert(`${product} borrado`); 
}


export {listAPI, createProduct, deleteProdut};

