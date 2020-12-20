export const setUserToLocalStorage = (user) => {
    localStorage.setItem('cleveroad_user', user);
}

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('cleveroad_user');
}