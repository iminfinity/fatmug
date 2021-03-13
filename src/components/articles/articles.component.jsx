import axios from "axios";
import { useEffect, useState } from "react";
import HomeArticle from "../home-article/home-article.component";
import Pagination from "../pagination/pagination.component";
import "./articles.styles.scss";

const Articles = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [currentArticles, setCurrentArticles] = useState([])
    useEffect(()=>{
        axios
        .get(`https://floating-bayou-25144.herokuapp.com/get-articles/${pageNumber}`)
        .then((response)=>{
            setCurrentArticles(response.data.currentArticles.reverse())
            console.log(response.data.currentArticles)
        })
    },[pageNumber])

    const updatePageNumber = (newPageNumber) => {
        setPageNumber(newPageNumber)
    }
    return(
        <section className="articles">
            {
                currentArticles ?  (
                    currentArticles.map((article)=>(
                        <HomeArticle 
                            heading={article.heading}
                            content={article.content}
                            writer={article.writer}
                            articleId={article.articleId}
                            key={article.articleId}
                        />
                    ))
                ) : null
            }
            <Pagination pageNumber={pageNumber} updatePageNumber={updatePageNumber} />
        </section>
    )
}

export default Articles;