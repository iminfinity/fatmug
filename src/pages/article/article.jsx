import Header from "../../components/header/header.component"
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import axios from "axios";
import { useUserData } from "../../data/user.context";
import{storage} from "../../firebase/utils";
import "./article.styles.scss";

const ArticlePage = () => {
    const {articleId} = useParams()
    const [article, setArticle] = useState({})
    const {getImageUrl} = useUserData()
    const [imageUrl, setImageUrl] = useState("")
    useEffect(()=>{
        axios
        .get(`https://floating-bayou-25144.herokuapp.com/get-article/${articleId}`)
        .then((response)=>{
            setArticle(response.data)
        }).catch((error)=> console.log(error.message))
    },[articleId])

    useEffect(()=>{
        if (article.writer !== undefined){
            storage
            .ref(`${article.writer}/${articleId}`)
            .getDownloadURL()
            .then((url) => {
                setImageUrl(url)
            })
            .catch((error) => {
              alert.show(error.message);
            });
        }
    },[article, articleId, getImageUrl])

    useEffect(()=>{
        axios
        .post(`https://floating-bayou-25144.herokuapp.com/update-view-count/${articleId}`)
        .then(()=>{
            console.log("View Count Updated")
        }).catch((error)=> console.log(error.message))
    },[articleId])
    return(
        <>
            <Header />
            <main className="single-article-page">
                {
                    article ? (
                        <>
                            <img src={imageUrl} alt=""/>  
                            <div>
                                <h2>{article.heading}</h2>
                                <p>{article.content}</p>
                            </div>  
                        </>
                    ):(
                        <h2>Loading</h2>
                    )
                }
                
            </main>
        </>
    )
}

export default ArticlePage