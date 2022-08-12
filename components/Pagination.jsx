import styles from "../styles/Home.module.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ videos, videosPerPage, pageNumber, onPageChange }) => {
  const pageCount = Math.ceil(videos.length / videosPerPage);

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
