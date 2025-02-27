import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import axios from 'axios';
import AddCommentForm from '../components/AddCommentForm';
import useUser from '../hooks/useUser';
const ArticlePage = () => {
    const { articleId } = useParams();
    const [articleInfo, setArticleInfo] = useState({upvotes:0, comments:[], canUpVote:false});
    const {canUpVote} = articleInfo;
    const {user, isLoading} = useUser();
    useEffect(() => {
        const loadArticleInfo = async() => {
            const token = user && await user.getIdToken();
            const headers = token?{authToken:token}:{};
            const response = await axios.get(`/api/articles/${articleId}`,{
                headers
            });
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        }
        if(isLoading) {
            loadArticleInfo(); 
        }
        
    },[isLoading,user]);
   
    const article = articles.find(article => article.name === articleId);
    const addUpVote = async() => {
        const token = user && await user.getIdToken();
        const headers = token?{authToken:token}:{};
        const response = await axios.put(`/api/articles/${articleId}/upvote`,null,{headers});
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }
    if(!article) {
        return <NotFoundPage />
    }
    return(
        <>
            <h1>{article.title}</h1>
            <div className='upvotes-section'>
                {user ? <button onClick={addUpVote}>{canUpVote?'Upvote':'already upvoted'}</button> : <button>Log in to upVote</button>}
                <p>This article has {articleInfo.upvotes} upvote(s)</p>
            </div>
           
            {article.content.map((paragraph,index) => (
                <p key={index}>{paragraph}</p>
            ))}
            {user ? <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}/>:<button>Login to add a comment</button>}
            
            <CommentsList comments={articleInfo.comments}/>
            
        </>
        
    )
}

export default ArticlePage;