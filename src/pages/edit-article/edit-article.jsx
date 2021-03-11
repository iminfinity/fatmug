import "./edit-article.styles.scss";
import { useState, useRef, useEffect } from "react";
import Header from "../../components/header/header.component";

const EditArticlePage = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    return (
        <>
        <Header />
        <form className="edit-article-form">
            <label>Title</label>
            <input 
                type="text"
                value={title}
                onChange={(event)=> setTitle(event.target.value)}
            />
            <label>Description</label>
            <textarea 
                rows="14"
                value={description}
                onChange={(event)=> setDescription(event.target.value)}
            ></textarea>
        </form>
    </>
    )
}

export default EditArticlePage