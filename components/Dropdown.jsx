import { useContext } from "react";
import StoreContext from "../contexts/store";
import styles from "../styles/Pages.module.css";

const Dropdown = ({ label, orderBy }) => {
  const { dispatch } = useContext(StoreContext);

  const optionsList = [
    { label: "Relevance", value: "relevance" },
    { label: "Date", value: "date" },
    { label: "Rating", value: "rating" },
    { label: "Title", value: "title" },
    { label: "Higher Views", value: "viewCount" },
  ];

  const handleSelection = (e) => {
    dispatch({
      type: "setOrderBy",
      data: e.target.value,
    });
  }

  return (
    <label className={styles.dropdown}>
      {label}
      <select value={orderBy} onChange={handleSelection}>
        {optionsList.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
