import React from 'react';

function PostLoading() {
//function PostLoading(Component) {
    return function PostLoadingComponent() {
    //return function PostLoadingComponent({ isLoading, ...props }) {
        //if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                We are waiting for the data to load! ...
            </p>
        );
    };
}
export default PostLoading;