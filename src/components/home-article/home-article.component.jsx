import "./home-article.styles.scss";
import {useEffect, useState} from "react";
import {storage} from "../../firabase/utils";

const HomeArticle = ({heading, content, articleId, writer}) => {
    const [imageUrl, setImageUrl] = useState("")
    useEffect(()=>{
        storage
        .ref(`${writer}/${articleId}`)
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
          console.log(url)
        })
        .catch((error) => {
          console.log(error.message);
        });
    },[writer,articleId])
    return(
        <div className="home-article">
            <div className="pic">
                <img src={imageUrl} alt=""/>
            </div>
            <h3>{heading}</h3>
            <p>{content}</p>
        </div>
    )
}

export default HomeArticle