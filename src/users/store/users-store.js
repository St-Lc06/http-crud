import { loadUsersByPage } from "../use-cases/load-users-by-page";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users  = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0 ) return; // si se regresa un array vacio entonces no hace nada
    // solo se actualiza si hay usuarios en esa page
}
const loadPrevioustPage = async() => {
    throw new Error('Not implemented');
}
const onUserChanged = () => {
    throw new Error('Not implemented');
}
const reloadPage = async() => {
    throw new Error('Not implemented');
}

export default {
    loadNextPage,
    loadPrevioustPage,
    onUserChanged,
    reloadPage,

    getUser: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}