import Articles from "../articles/articles.component";
import Popular from "../popular/popular.component";
import "./content.styles.scss";

const Content = () => {
    return (
        <main className="content">
            <Articles />
            <Popular />
        </main>
    )
}

export default Content;