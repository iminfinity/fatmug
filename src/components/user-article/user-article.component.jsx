import {useEffect, useState} from "react";
import { useAlert } from "react-alert";
import {storage} from "../../firebase/utils";

import "./user-article.styles.scss";

import {ReactComponent as Edit} from "../../assets/document-edit.svg"
import {ReactComponent as Delete} from "../../assets/trash-can.svg"
import { useHistory } from "react-router";
import { useUserData } from "../../data/user.context";

const Article = ({article, index}) =>{
    const [imageUrl, setImageUrl] = useState("")
    const {writer, heading, content, articleId} = article
    const {deleteArticle} = useUserData()
    const alert = useAlert()
    const history = useHistory()
    useEffect(()=>{
        storage
        .ref(`${writer}/${articleId}`)
        .getDownloadURL()
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          alert.show(error.message);
        });
    },[alert, articleId, writer])
    const handleEdit = () => {
        history.push(`/update-article/${index}`)
    }

    const handleDelete =  () => {
        deleteArticle(articleId)
    }
    return(
        <section className="user-article">
            <div className="image">
                <img src={imageUrl} alt=""/>
            </div>
            <div className="text">
                <h4>{heading}</h4>
                <p>{content}</p>
            </div>
            <div className="action-buttons">
                <button onClick={handleEdit}><Edit/></button>
                <button onClick={handleDelete}><Delete/></button>
            </div>
        </section>
    )
}

export default Article