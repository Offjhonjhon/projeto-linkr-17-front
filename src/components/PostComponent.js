import styled from "styled-components";
import CommentsBox from "./Comments/CommentsBox";
import CommentsIcon from "./Comments/CommentsIcon";
import Likes from "./Likes";
import Reposts from "./Reposts";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Hashtag from "./Hashtag";

export default function PostComponent({ post }) {
    const data = localStorage.getItem("dados");
    const { token, avatar } = JSON.parse(data);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();
    const [chat, setChat] = useState(false);
    console.log(token)

    return (
        <Post>
            <div className="post-container">
                <div className="user-info">
                    <div onClick={() => navigate("/user/" + post.id)} className="profile-picture">
                        <img src={post.avatar} alt={post.name} />
                    </div>
                    <Likes postId={post.postId} token={token} />
                    <CommentsIcon postId={post.postId} callback={() => setChat(!chat)} refresh={refresh} />
                    <Reposts token={token} postId={post.postId} />
                </div >
                <div className="post-area">
                    <p onClick={() => navigate("/user/" + post.id)} className="user-name">{post.name}</p>
                    <p className="text"><Hashtag>{post.text}</Hashtag></p>
                    <a className="link-area" href={post.url} target="_blank" rel="noopener noreferrer">
                        <div className="link-left">
                            <div className="title">{post.title}</div>
                            <div className="description">{post.description}</div>
                            <div className="url">{post.url}</div>
                        </div>
                        <img src={post.image} alt="Post" />
                    </a>
                </div>
            </div>
            <CommentsBox
                post={post}
                visibility={chat}
                avatar={avatar}
                token={token}
                refresh={refresh}
                setRefresh={setRefresh} />
        </Post >
    )
}

const Post = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 209px;
    width: var(--width);
    margin-top: 16px;
    border-radius: var(--border-radius);
    background-color: #171717;
    box-shadow: 0px 4px 4px 0px #00000040;
    position: relative;

    display: flex;

    .post-container {
        display: flex;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-picture {
        height: 75px;
        width: 68px;
        margin-right: 10px;
        margin-top: 10px;
    }

    .profile-picture > img {
        margin: 9px 0 0 18px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        object-fit: cover;
        
    }

    .post-area {
        height: 100%;
        width: calc(var(--width) - 68px);
        padding: 20px 20px 20px 10px;

        display: flex;
        flex-direction: column;
    }

    .post-area * {
        font-family: 'Lato', sans-serif;
    }

    .post-area > .user-name {
        color: white;
        font-size: 19px;
        font-weight: 400;
    }

    .post-area > .text {
        margin-top: 12px;
        padding-bottom: 5px;
        color: #B7B7B7;
        font-size: 17px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .link-area {
        margin-top: 12px;
        width: calc(var(--width) - 108px);
        height: 155px;
        border-radius: 11px;
        border: 1px solid #4D4D4D;
        text-decoration: none;

        display: flex;
    }

    .link-left {
        width: calc(0.7 * (var(--width) - 108px));
        height: 153px;
        padding: 24px 19px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .link-left > * {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }

    .link-left > .title {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        -webkit-line-clamp: 2;
    }
    .link-left > .description {
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        -webkit-line-clamp: 3;
    }
    .link-left > .url {
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        -webkit-line-clamp: 1;
    }

    .link-area > img {
        width: calc(0.3 * (var(--width) - 108px));
        height: 153px;
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
        object-fit: cover;
    }
`;