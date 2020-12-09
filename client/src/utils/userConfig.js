/**
 * Token config file
 */


/**
 * Set token value in localStorage
 * @param {*} user
 */
exports.setUser = (user) => {
    localStorage.setItem('user', user);
}
exports.setUserId = (user) => {
    localStorage.setItem('user', user);
}


/**
 * Get token information from localStorage
 */
exports.getUser = () => {
    return localStorage.getItem('user');
}
exports.getUserId = () => {
    return localStorage.getItem('user');
}




/**
 * Remove all items in localStorage
 */
exports.removeUser = () => {
    localStorage.clear();
}
