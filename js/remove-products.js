import { deleteProdut } from "./main.js";

const deleteButton = document.querySelector('.delete_button');
const verificationQ = document.querySelector('[data-verification]');
const blurScreen = document.querySelector('.blur');
const bodyPag = document.querySelector('body'); 
const deleteConfirm = document.querySelector('.verification_delete');
const cancelConfirm = document.querySelector('.verification_cancel');

async function verificationQuest() {
    verificationQ.style.display = 'flex';
    blurScreen.style.display = 'block';
    blurScreen.classList.add('showMiddle');
    verificationQ.classList.add('show');
    bodyPag.classList.add("stop-scrolling");
}
function verificationResult() {
    verificationQ.style.display = 'none';
    blurScreen.style.display = 'none';
    verificationQ.classList.remove('show');
    bodyPag.classList.remove("stop-scrolling");
}


deleteButton.addEventListener('click', verificationQuest);
deleteConfirm.addEventListener('click', verificationResult);
cancelConfirm.addEventListener('click', verificationResult);

export {verificationQuest};
export {verificationResult};