import { useReducer } from "react";

const initialState = {
  searchResults: [],
  selectedVideo: {},
  pageNumber: 0,
  open: false,
  favourites: [],
  alert: false,
  alertContent: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setSearchResults":
      return {
        ...state,
        searchResults: action.data,
      };
    case "setSelectedVideo":
      return {
        ...state,
        selectedVideo: action.data,
      };
    case "setPageNumber":
      return {
        ...state,
        pageNumber: action.data,
      };
    case "setOpen":
      return {
        ...state,
        open: action.data,
      };
    case "setFavourites":
      return {
        ...state,
        favourites: action.data,
      };
    case "setAlert":
      return {
        ...state,
        alert: action.data,
      };
    case "setAlertContent":
      return {
        ...state,
        alertContent: action.data,
      };
    default:
      return state;
  }
}

// Custom hook
const useStore = () => useReducer(reducer, initialState);

export default useStore;
