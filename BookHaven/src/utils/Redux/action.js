import { FETCHING, SEARCH, STORE_FORM_DATA } from "./actionType";

export const fetchData = (books) => {
  return {
    type: FETCHING,
    payload: books,
  };
};
export const searchBooks = (query) => {
  return {
    type: SEARCH,
    payload: query,
  };
};
export const storeFormData = (data) => {
    console.log(data)
  return {
    type: STORE_FORM_DATA,
    payload: data,
  };
};
