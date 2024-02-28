import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/getUserById';

// Como se va a hacer referencia a el en varios lugares entonces
let modal, form;
let loadedUser = {};


/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if ( !id ) return;
    const user = await getUserById( id );
    setFormValues( user );
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.firstName;
    loadedUser = user;
}


/**
 * @param {HTMLDivElement} element 
 * @param { (userLike)=> Promise<void> } callBack //recibe userL, return promesa que regresa void
 */
export const renderModal = ( element, callBack ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal'; //add clases, otra manera
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if ( event.target.className === 'modal-container' ) {
            hideModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault(); 

        const formData = new FormData( form );
        const userLike = { ...loadedUser }; //obj vacio

        // Esto es para convertir valores y si no. entonces es string, (en el tipo que vengan)
        for (const [key, value] of formData) {
            if ( key === 'balance' ) {
                userLike[key] = +value;
                continue;
            }

            if ( key === 'isActive' ) {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value;
        }

            //TODO: Guardar usuario

            await callBack( userLike );
            
            hideModal();

        // console.log(userLike);
    });

    element.append( modal );
}