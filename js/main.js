async function listAPI() {
    const connectionAPI = await fetch('http://localhost:3004/products');
    const dataAPI = connectionAPI.json();
    console.log(dataAPI);
    return dataAPI
};

async function createAPI() {
    const  conexion = await fetch('http://localhost:3004/products',{
        method: 'POST',
        headers: {'content-type':'aplication/json'},
        body: JSON.stringify({
            name:name,
            size: size,
            price: price,
            stock:`${stock}`,
            url:url
        })
    });
    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

export {listAPI};