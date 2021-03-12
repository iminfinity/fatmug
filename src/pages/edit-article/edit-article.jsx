import { useEffect, useState } from "react";
import {  useParams } from "react-router";
import Header from "../../components/header/header.component";
import { useUserData } from "../../data/user.context";
import { useAlert } from "react-alert";
import FormInput from "../../components/form-input/form-input.component";
const EditArticlePage = () => {
    const {articles,updateArticle } = useUserData()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const alert = useAlert()
    const {articleIndex} = useParams()
    const saveUpadatedArticle = () => {
        updateArticle(title,description,articleIndex)
        setDescription("")
        setTitle("")
        alert.show("Article updated")
    }
    useEffect(()=>{
        if(articles.length > 0){
            setTitle(articles[articleIndex].heading)
            setDescription(articles[articleIndex].content)  
        }
    },[articleIndex, articles])
    return (
        <>
            <Header  effect={saveUpadatedArticle} buttonText="update" />
            <form className="create-article-form">
                <FormInput 
                    title={title}
                    description={description} 
                    setDescription={setDescription} 
                    setTitle={setTitle} 
                />
            </form>
        </>
    )
}

export default EditArticlePage;