import styles from "../styles/Home.module.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageNumber, setPageNumber, searchResults, videosPerPage }) => {
  const pageCount = Math.ceil(searchResults.length / videosPerPage);

  const onPageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        forcePage={pageNumber}
        onPageChange={onPageChange}
        containerClassName={styles.paginationBtns}
        activeClassName={styles.paginationActive}
        previousLinkClassName={styles.previousBtn}
        nextLinkClassName={styles.nextBtn}
      />
    </>
  );
};

export default Pagination;
