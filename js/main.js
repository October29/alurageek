async function listAPI() {
    const connectionAPI = await fetch(`http://localhost:3000/products`);
    const dataAPI = connectionAPI.json();
    console.log(dataAPI);
    return dataAPI
};

async function createProduct(name, size, price, stock, url,id) {
    const connetion = await fetch('http://localhost:3000/products',{
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({
            id: id,
            name: name,
            size: size,
            price: price,
            stock: `${stock}`,
            url: url,
        })
    });
    const dataAPI = connetion.json();
    
    
    if(!connetion.ok) {
        throw new Error('Ha ocurrido un error al ingresar el producto');
    }
    return dataAPI.id;
};



export {listAPI, createProduct};

