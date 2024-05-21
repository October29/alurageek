const spawnerButton = document.querySelector('.spawner');
const newProductMenu = document.querySelector('[data-form]');
function spawnAddNewProduct() {
    if (newProductMenu.style.display === 'none') {
        newProductMenu.style.display = 'flex';
        newProductMenu.classList.add('show');
        spawnerButton.classList.add('colorTwo');
    } else {
        newProductMenu.style.display = 'none';
        newProductMenu.classList.remove('show');
        spawnerButton.classList.remove('colorTwo');
    }
};

spawnerButton.addEventListener('click', spawnAddNewProduct);