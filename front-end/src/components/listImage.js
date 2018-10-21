import React from 'react';

const listimage = props => {
    const results = props.data;
    let imgs = results.map(img => <Img url={img.urls.small} key={img.id}/>);

    return (
        <ul className="img-list">
            {imgs}
        </ul>
    );
};

function listImage(props) {
    const input = props.data;
    const imgs = input.map((image) =>
        <img src={image.url.regular} alt={image.url.small} key={image.id}/>);
    return (
        <ul>{imgs}</ul>
    );
}

export default listImage;