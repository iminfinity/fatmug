import {useEffect, useState} from "react";
import axios from "axios";
import { storage } from "../../firebase/utils";

const PopularArticle = ({articleId}) => {
    const [article, setArticle] = useState({})
    const [imageUrl, setImageUrl] = useState("")
     
    useEffect(()=>{
        axios
        .get(`https://floating-bayou-25144.herokuapp.com/get-article/${articleId}`)
        .then((response)=>{
            setArticle(response.data)
        }).catch((error)=> console.log(error.message))
    },[articleId])

    useEffect(()=>{
        if (article !== undefined){
            storage
            .ref(`${article.writer}/${article.articleId}`)
            .getDownloadURL()
            .then((url)=>{
                setImageUrl(url)
            })
            .catch((error)=> console.log(error.message))
        }
    }, [article])
    return (
        <div className="popular-article">
            <div>
                <img src={imageUrl} alt=""/>
            </div>
            <div>
                <h6>
                    {article.heading}
                </h6>
                <p>
                    {article.content}
                </p>
            </div>
        </div>
    )
}

export default PopularArticle;