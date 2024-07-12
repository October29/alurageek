async function listAPI() {
    const response = await fetch('http://localhost:3000/products');
    if (!response.ok) {
        throw new Error('Error al obtener los productos');
    }
    return await response.json();
}

const cardsContainer = document.querySelector('[data-cards]');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const noResultsMessage = document.getElementById('noResultsMessage');

async function showItem(id, name, size, price, stock, url) {
    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.dataset.id = id;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete_button';
    deleteButton.textContent = '×';
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('Botón de eliminar clicado');
        await deleteProduct(id);
        cardItem.remove();  // Eliminar el elemento visualmente después de eliminarlo del backend
    });

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.className = 'item_pic';
    img.src = url;
    img.alt = `${name} - figura`;

    const figcaption = document.createElement('figcaption');
    figcaption.className = 'item_name';
    figcaption.textContent = `${name} - tamaño ${size} cm`;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    const buyControlDiv = document.createElement('div');
    buyControlDiv.className = 'buy_control';

    const buyButton = document.createElement('button');
    buyButton.textContent = 'Comprar';

    const priceParagraph = document.createElement('p');
    priceParagraph.className = 'item_price';
    priceParagraph.textContent = `$${price} COP`;

    buyControlDiv.appendChild(buyButton);
    buyControlDiv.appendChild(priceParagraph);

    const stockParagraph = document.createElement('p');
    stockParagraph.className = 'item_stock';
    stockParagraph.innerHTML = `<strong>${stock}</strong> en stock`;

    cardItem.appendChild(deleteButton);
    cardItem.appendChild(figure);
    cardItem.appendChild(buyControlDiv);
    cardItem.appendChild(stockParagraph);

    return cardItem;  // Devolver el elemento cardItem
}

async function listItems() {
    const products = await listAPI();
    cardsContainer.innerHTML = '';  // Limpiar el contenedor de tarjetas

    for (const product of products) {
        const cardItem = await showItem(
            product.id,
            product.name,
            product.size,
            product.price,
            product.stock,
            product.url
        );
        if (cardItem instanceof Node) {  // Verificar  cardItem 
            cardsContainer.appendChild(cardItem);
        } else {
            console.error('showItem no devolvió un nodo válido:', cardItem);
        }
    }
}

async function deleteProduct(productId) {
    const url = `http://localhost:3000/products/${productId}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }
        console.log('Producto', productId, 'eliminado');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function filterItems(event) {
    event.preventDefault();  // Evitar la recarga de la página al enviar el formulario

    const query = searchInput.value.trim().toLowerCase();

    try {
        const products = await listAPI(); 

        cardsContainer.innerHTML = '';  // Limpiar el contenedor de tarjetas
        let foundResults = false;

        for (const product of products) {
            if (query === '' || product.name.toLowerCase().includes(query)) {
                const cardItem = await showItem(
                    product.id,
                    product.name,
                    product.size,
                    product.price,
                    product.stock,
                    product.url
                );
                if (cardItem instanceof Node) {  
                    cardsContainer.appendChild(cardItem);
                    foundResults = true;  // Marcar que se encontraron resultados
                } else {
                    console.error('showItem no devolvió un nodo válido:', cardItem);
                }
            }
        }

        // Mostrar el mensaje de sin resultados si no se encontraron resultados
        if (!foundResults) {
            noResultsMessage.classList.remove('hidden');
        } else {
            noResultsMessage.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error al filtrar los productos:', error);
    }
}

searchForm.addEventListener('submit', filterItems);

// Mostrar todos los productos al cargar la página
listItems();