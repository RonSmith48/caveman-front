import React, { useEffect, useState } from 'react';
import Posts from '../../../src/components/docs/Posts';
import PostLoadingComponent from '../../../src/components/docs/PostLoading';

function Documentation() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });
    useEffect(() => {
        setAppState({ loading: true });
        const apiUrl = 'http://localhost:8000/api/';
        fetch(apiUrl)
            .then((data) => data.json())
            .then((posts) => {
                setAppState({ loading: false, posts: posts });
            });
    }, [setAppState]);
    return (
        <div className='Docs'>
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}
export default Documentation;








/* class connectionExample extends React.Component {
    componentDidMount() {
        const apiUrl = 'http://localhost:8000/api/';
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    render() {
        return <div>Example connection</div>;
    }
}
export default connectionExample; */