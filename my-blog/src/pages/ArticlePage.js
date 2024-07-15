import { useParams } from 'react-router-dom';
import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
const ArticlePage = () => {
    const { articleId } = useParams();
    const article = articles.find(article => article.name === articleId);
    if(!article) {
        return <NotFoundPage />
    }
    return(
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph,index) => (
                <p key={index}>{paragraph}</p>
            ))}
            
        </>
        
    )
}

export default ArticlePage;