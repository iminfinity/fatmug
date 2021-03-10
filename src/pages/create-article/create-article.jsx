import { useState, useRef } from "react";
import Header from "../../components/header/header.component";
import "./create-article.styles.scss";

const CreateArticlePage = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const uploadRef = useRef()
    return (
        <>
            <Header />
            <form className="create-article-form">
                <label>Title</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(event)=> setTitle(event.target.value)}
                />
                <label>Description</label>
                <textarea 
                    rows="30"
                    value={description}
                    onChange={(event)=> setDescription(event.target.value)}
                ></textarea>
                <div>
                    <input
                        type="file"
                        ref={uploadRef}
                    />
                    <button onClick={()=>uploadRef.current.click() }> Upload Image</button>
                </div>
            </form>
        </>
    )
}

export default CreateArticlePage