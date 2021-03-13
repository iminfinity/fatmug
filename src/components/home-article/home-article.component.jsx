import "./home-article.styles.scss";
import {useEffect, useState} from "react";
import {storage} from "../../firebase/utils";
import {useHistory} from "react-router-dom";

const HomeArticle = ({heading, content, articleId, writer}) => {
    const [imageUrl, setImageUrl] = useState("")
    const history = useHistory()
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
        <div className="home-article" onClick={()=>history.push(`/article/${articleId}`)}>
            <div className="pic">
                <img src={imageUrl} alt=""/>
            </div>
            <h3>{heading}</h3>
            <p>{content}</p>
        </div>
    )
}

export default HomeArticle