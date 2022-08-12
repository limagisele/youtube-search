import { useReducer } from "react";

const initialState = {
  searchResults: [],
  selectedVideo: {},
  pageNumber: 0,
  open: false,
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
    default:
      return state;
  }
}

// Custom hook
const useStore = () => useReducer(reducer, initialState);

export default useStore;
