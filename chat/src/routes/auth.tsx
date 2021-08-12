export const TOKEN_KEY = "@TOKEN"
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const setToken = (token: any) => localStorage.setItem(TOKEN_KEY,token);


export const ID_USER = "@ID";
export const setId = (id: any) => localStorage.setItem(ID_USER,id);
export const getId = () => localStorage.getItem(ID_USER);