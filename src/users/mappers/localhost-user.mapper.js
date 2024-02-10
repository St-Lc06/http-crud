import { User } from "../models/user"


/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */
export const localhostUserToModel = ( localhostUser ) => {

    const { // 1 desestructurar las propiedades que vienen
        avatar,
        balance,
        first_name,
        gender,
        id, 
        isActive,
        last_name,
    } = localhostUser; // 2 en este objeto

    return new User({ // el obj que se va a crear va a tener los valores esperados
        avatar,
        balance,
        firtstName: first_name,
        gender,
        id, 
        isActive,
        lastName: last_name,
    });
}




