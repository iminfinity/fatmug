import { useUserData } from "../../data/user.context";
import PopularArticle from "../popular-article/popular-article.component";
import "./popular.styles.scss";

const Popular = () => {
    const {popularArticlesInfo} = useUserData()
    return(
        <aside className="popular">
            <h4>Top Articles</h4>
            {
                popularArticlesInfo ? (
                    popularArticlesInfo.map((item)=>(
                        <PopularArticle articleId={item.articleId}/>
                    ))
                ):(
                    <h6> Loading</h6>
                )
            }
        </aside>
    )
}

export default Popular;