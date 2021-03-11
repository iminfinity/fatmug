import { useState, useRef } from "react";
import Header from "../../components/header/header.component";
import "./create-article.styles.scss";

const CreateArticlePage = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const uploadRef = useRef()
    const [imageSrc, setImageSrc] = useState()

    const handleFile = () => {
        if (uploadRef.current.files && uploadRef.current.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setImageSrc(event.target.result)
            }
            
            reader.readAsDataURL(uploadRef.current.files[0]);   
        }
    }
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
                    rows="14"
                    value={description}
                    onChange={(event)=> setDescription(event.target.value)}
                ></textarea>
                <div>
                    <input
                        type="file"
                        ref={uploadRef}
                        onChange={handleFile}
                        multiple={false}
                    />
                    {/* <button onClick={handleUpload}> Upload Image</button> */}
                </div>
                <div>
                    {
                        imageSrc ? ( <img src={imageSrc} alt="" />) : null
                    }
                </div>
            </form>
        </>
    )
}

export default CreateArticlePage;