import styles from "./TransactionList.module.css";

const ArrowLeft = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#ffffff"
    >
        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
    </svg>
);

const ArrowRight = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#e8eaed"
    >
        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
    </svg>
);

export default function PaginationButton({ currentPage, totalPages, handlePageChange}){

    const handlePrevPage = () => {
        if(currentPage > 1){
            handlePageChange(currentPage - 1);
        }
    }; 
    
    const handleNextPage = () => {
        if(currentPage < totalPages){
            handlePageChange(currentPage + 1);
        }
    }

    const numberedPage = [];

    for(let page = 1; page <= totalPages; page++){
        numberedPage.push(
            <button 
                key={page} 
                onClick={() => {handlePageChange(page)}}
                className={`${page == currentPage ? styles.active : ""}`}
            >
                {page}
            </button>
        );
    };


    return(
        <div className={styles.paginationContainer}>
            <button 
                className={`${styles.navigationBtn} ${currentPage == 1 ? styles.disabledBtn : ""}`} 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
            >
                <ArrowLeft />
            </button>

            {numberedPage}

            <button 
                className={`${styles.navigationBtn} ${currentPage == totalPages ? styles.disabledBtn : ""}`} 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
            >
                <ArrowRight />
            </button>
        </div>
    );
}