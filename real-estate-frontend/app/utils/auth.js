export const setToken = (username) => localStorage.setItem("username", username);
export const getUsername = () => localStorage.getItem("username");
export const removeToken = () => localStorage.removeItem("username");
