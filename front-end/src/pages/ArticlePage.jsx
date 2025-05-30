import { useParams } from "react-router-dom";
import articles from '../article-content.js';

export default function ArticlePage() {
    const { name } = useParams();
    const article = articles.find(article => article.name === name);
    console.log("Article Name:", name);

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map(p => <p key={p}>{p}</p>)}
        </>
    );
}   