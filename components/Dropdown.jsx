import styles from "../styles/Pages.module.css";

const Dropdown = ({ label, orderBy, setOrderBy }) => {
  const optionsList = [
    { label: "Relevance", value: "relevance" },
    { label: "Date", value: "date" },
    { label: "Rating", value: "rating" },
    { label: "Title", value: "title" },
    { label: "Higher Views", value: "viewCount" },
  ];
  return (
    <label className={styles.dropdown}>
      {label}
      <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
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
