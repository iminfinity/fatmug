import "./user-articles.styles.scss";
import {useUserData} from "../../data/user.context";
import Article from "../../components/user-article/user-article.component";
import Header from "../../components/header/header.component";

const UserArticlesPage = () => {
    const {articles} = useUserData()
    return (
        <>
        <Header />
        <main className="user-articles-page"> 
            <h1>Your Submitted Article</h1>
            {  
                articles ? (
                  articles.map((article, index)=>(
                    <Article article={article} key={index}  index={index}/>
                ))
                ) : (
                    <h3>
                        No articles written
                    </h3>
                )
              
            }
        </main>
        </>
    )
}

export default UserArticlesPage