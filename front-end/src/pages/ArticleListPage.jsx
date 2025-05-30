import articles from "../article-content";
import ArticlesList from "../ArticleList";

export default function ArticleListPage() {
    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles}></ArticlesList>
        </>
    );
}
