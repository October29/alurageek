import  { listAPI }  from "./main.js"

const cardsContainer = document.querySelector('[data-cards]');

async function showItem (name, size, price, stock, url) {
    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.innerHTML = `
    <button class="delete_button">x</button>
    <figure>
                <img class="item_pic" src="${url}" alt="${name} - figure">
                <figcaption class="item_name">${name} - tamaño ${size}cm</figcaption>
            </figure>
            <div class="buy_control">
                <button>Comprar</button>
                <p class="item_price">$ ${price} COP</p>
            </div>
            <p class="item_stock"><strong>${stock}</strong> en stock</p>
    `;
    console.log(cardItem);

    return cardItem
};

async function listItems() {
    const listAPIResult = await listAPI();
    for (const card of listAPIResult) {
        const cardItem = await showItem(card.name, card.size, card.price, card.stock, card.url);
        cardsContainer.appendChild(cardItem);
    }
};



listItems();

