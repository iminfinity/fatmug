import axios from "axios";
import { useEffect, useState } from "react";
import HomeArticle from "../home-article/home-article.component";
import "./articles.styles.scss";

const Articles = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [currentArticles, setCurrentArticles] = useState([])
    useEffect(()=>{
        axios
        .get(`https://floating-bayou-25144.herokuapp.com/get-articles/${pageNumber}`)
        .then((response)=>{
            setCurrentArticles(response.data.currentArticles)
            console.log(response.data.currentArticles)
        })
    },[pageNumber])
    return(
        <section className="articles">
            {
                currentArticles.length > 1 ? (
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
        </section>
    )
}

export default Articles;