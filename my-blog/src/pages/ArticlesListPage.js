import ArticlesList from "../components/ArticlesList";
import articles from "./article-content";
import { Link } from "react-router-dom";
const ArticlesListPage = () => {
    return(
        <>
            <ArticlesList articles={ articles }/>
        </>
        
    )
}

export default ArticlesListPage;