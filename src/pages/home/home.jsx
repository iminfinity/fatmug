import Articles from "../../components/articles/articles.component";
import Popular from "../../components/popular/popular.component";
import Header from "../../components/header/header.component";

import "./home.styles.scss";

const HomePage = () => {
    return (
        <>
            <Header />
            <main className="home-content">
                <Articles />
                <Popular />
            </main>
        </>
    )
}

export default HomePage