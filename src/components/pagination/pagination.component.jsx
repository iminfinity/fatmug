import axios from "axios";
import { useEffect, useState } from "react";
import {default as Paginate} from "react-js-pagination";
import "./pagination.styles.scss";
const Pagination = ({pageNumber, updatePageNumber}) => {
    const [totalArticles, setTotalArticles] = useState(1)
    useEffect(()=>{
        axios
        .get("https://floating-bayou-25144.herokuapp.com/get-total-articles-count")
        .then((response)=>{
            setTotalArticles(response.data.total)
        })
    }, [])
    
    return(
        <Paginate
        activePage={pageNumber}
        itemsCountPerPage={10}
        totalItemsCount={totalArticles}
        pageRangeDisplayed={5}
        onChange={updatePageNumber}
        itemClass="item-class"
        prevPageText="Prev"
        nextPageText="Next"
        firstPageText=""
        lastPageText=""
      />
    )
}
export default Pagination