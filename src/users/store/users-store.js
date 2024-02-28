import { User } from "../models/user";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users  = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0 ) return; // si se regresa un array vacio entonces no hace nada
    // solo se actualiza si hay usuarios en esa page
    state.currentPage += 1;
    state.users = users;
}
const loadPrevioustPage = async() => {
    if ( state.currentPage ===1 ) return; // se hace la perticion si la pagina > a la 1
    const users = await loadUsersByPage( state.currentPage - 1);
    state.users = users;
    state.currentPage -= 1;
}

/**
 * 
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {

    let wasFound = false;

   state.users = state.users.map( user => {
        if ( user.id === updatedUser.id ) {
            wasFound = true;
            return updatedUser;
        }
        return user;
   }); 

   if ( state.users.length < 10 && !wasFound ) { // si hay menos de 10 en la page
    state.users.push( updatedUser );
   }
}

const reloadPage = async() => {
    throw new Error('Not implemented');
}

export default {
    loadNextPage,
    loadPrevioustPage,
    onUserChanged,
    reloadPage,


    /**
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}