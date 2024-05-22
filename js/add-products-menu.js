import { createProduct } from "./main.js";

const spawnerButton = document.querySelector('.spawner');
const newProductMenu = document.querySelector('[data-form]');
const addIcon = document.querySelector('.add');
let counter = 0;

function spawnAddNewProduct() {
    if (counter === 0) {
        newProductMenu.style.display = 'flex';
        newProductMenu.classList.add('show');
        spawnerButton.classList.add('colorTwo');
        addIcon.style.transform = 'rotate(45deg)';
        counter++
        console.log(counter + ' eche');
    } else if(counter === 1){
        counter = 0;
        newProductMenu.style.display = 'none';
        newProductMenu.classList.remove('show');
        spawnerButton.classList.remove('colorTwo');
        addIcon.style.transform = 'rotate(0deg)';
        console.log('nojoda')
    }
};

async function addNewProduct(event) {
    event.preventDefault();

    const name = document.querySelector('[data-name]').value;
    const size = document.querySelector('[data-size]').value;
    const price = document.querySelector('[data-price]').value;
    const url = document.querySelector('[data-url]').value;
    const stock = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

    try {
        await createProduct(name, size, price, stock, url);
    } catch (e) {
        alert(e);
    }
}

newProductMenu.addEventListener('submit', event => addNewProduct(event));
spawnerButton.addEventListener('click', spawnAddNewProduct);