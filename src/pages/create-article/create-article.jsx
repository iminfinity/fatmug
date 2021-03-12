import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../../components/header/header.component";
import { useUserData } from "../../data/user.context";
import "./create-article.styles.scss";
import {v4 as uuidv4} from "uuid";
import { useAlert } from "react-alert";
import FormInput from "../../components/form-input/form-input.component";
import ImageUploader from "../../components/image-upload/image-upload.component";
const CreateArticlePage = () => {
    const {addNewArticle, uploadImage, articles} = useUserData()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const uploadRef = useRef()
    const [imageSrc, setImageSrc] = useState("")
    const location = useLocation()
    const alert = useAlert()
 
    const handleFile = () => {
        if (uploadRef.current.files && uploadRef.current.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
              setImageSrc(event.target.result)
            }
            
            reader.readAsDataURL(uploadRef.current.files[0]);   
        }
    }
    const addArticle = () => {
        const articleId = uuidv4()
        uploadImage(uploadRef.current.files[0], articleId)
        addNewArticle(title,description,articleId)
        setDescription("")
        setTitle("")
        setImageSrc("")
        alert.show("New article added")
    }
    return (
        <>
            <Header  effect={addArticle} buttonText="publish" />
            <form className="create-article-form">
                <FormInput 
                    title={title}
                    description={description} 
                    setDescription={setDescription} 
                    setTitle={setTitle} 
                />
                <ImageUploader  
                    uploadRef={uploadRef} 
                    handleFile={handleFile} 
                    imageSrc={imageSrc}
                />
            </form>
        </>
    )
}

export default CreateArticlePage;