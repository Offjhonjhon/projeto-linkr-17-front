import React, { useRef, useEffect, useState, useContext } from "react";
import StateContext from "../contexts/StateContext.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hashtag from "../components/Hashtag";
import Likes from "../components/Likes.js";
import DeleteIcon from "../components/DeleteIcon.js";

import TrendingHashtags from '../components/TrendingHashtags';
import EditIcon from "../components/EditIcon.js";

function Timeline() {
    const data = localStorage.getItem("dados");
    const token = JSON.parse(data).token;
    const getData = localStorage.getItem("dados");
    const { avatar } = getData ? JSON.parse(getData) : '';
    const { setVisible } = useContext(StateContext);
    const navigate = useNavigate()
    
    setVisible(true)

    const getTags = (text) => {
        const tags = [];
        text.split(" ").forEach(tag => {
            if (tag.startsWith("#")) {
                tags.push(tag.replace("#", ""));
            }
        })
        return tags;
    }

    const URL_BACK = "http://localhost:4000";
    
    const config = {
         headers: { 
             Authorization: `Bearer ${token}`
        } 
    }

    const [posts, setPosts] = useState("Loading");

    const [refresh, setRefresh] = useState([]);
    function refreshTimeline() { setRefresh([]) }


    useEffect(() => {
        function getTimeline() {
            const promise = axios.get(URL_BACK + "/posts", { headers: { Authorization: `Bearer ${token}` }});

            promise.then(answer => {
                setPosts(answer.data);
            });

            promise.catch(error => {
                alert("An error occured while trying to fetch the posts, please refresh the page");
            });
        }

        if(token) {
            getTimeline();
        } else {
            navigate("/sign-in");
        }

    }, [URL_BACK, refresh]);


    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);


    function publish(event) {
        event.preventDefault();
        setLoading(true);
        const publicationCode = Date.now().toString();

        const publication = {
            url: url,
            text: text,
            publicationCode: publicationCode
        }

        const tags = getTags(text);

        const promisse = axios.post(`${URL_BACK}/publish`, publication, { headers: { Authorization: `Bearer ${token}` } });

        promisse.then(res => {
            setLoading(false);
            setUrl("");
            setText("");
            refreshTimeline();
        });

        promisse.catch(error => {
            setLoading(false);
            alert("Houve um erro ao publicar seu link");
        });

        tags.forEach(tag => {
            console.log(tag);
            console.log(publicationCode);
            axios.post(`${URL_BACK}/hashtag/tag`, {
                publicationCode: publicationCode,
                tag: tag
            });
        })
    }

    const [active, setActive] = useState(false);
    const [enableTextArea, setEnableTextArea] = useState(false);
    const textareaRef = useRef("");
    const [publicationId, setPublicationId] = useState("");

    const handleUserKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendUpdate();
        }
    };

    async function sendUpdate() {
        setEnableTextArea(true);

        try {
            await axios.post("http://localhost:4000/post/edit", {
                publicationId,
                description: textareaRef.current.value
            }, config);

            console.log(textareaRef.current.value);
            setActive(false);
            refreshTimeline();
        } catch (e) {
            alert("Não foi possível salvar as alterações!");
            setEnableTextArea(false);
        }
    }


    console.log(posts)
    return (
        <TimeLinePage>
            <Main>
                <div className="timeline">timeline</div>
                <div className="publish">
                    <div className="profile-picture">
                        <ProfileImage src={avatar} alt="user-profile" />
                    </div>
                    <form className="publish-form" onSubmit={publish}>
                        <p>What are you going to share today?</p>
                        <input className="url" placeholder="http://..." type="url" value={url} onChange={e => setUrl(e.target.value)} required disabled={loading} />
                        <textarea className="text" placeholder="Awesome article about #javascript" type="text" value={text} onChange={e => setText(e.target.value)} disabled={loading} />
                        <button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</button>
                    </form>
                </div>
                {
                    posts === "Loading" ? <p className="message">Loading...</p> : posts === "Empty" ? <p className="message">There are no posts yet</p> : posts.map((post, index) => {
                        return (                            
                            <Post key={index}>
                                {post.isFromUser ? 
                                <Icons>
                                    <EditIcon active={active}
                                           setActive={setActive}
                                           enableTextArea={enableTextArea}
                                           setEnableTextArea={setEnableTextArea}
                                           textareaRef={textareaRef}
                                           setPublicationId={setPublicationId}
                                           postId={post.postId} />
                                    <DeleteIcon config={config} postId={post.postId} refreshTimeline={refreshTimeline}/>
                                </Icons>
                                : ""}                                
                                <div className="user-info">
                                    <div onClick={() => navigate("/user/" + post.id)} className="profile-picture">
                                        <img src={post.avatar} alt={post.name} />
                                    </div>
                                    <Likes postId={post.postId} token={token}/>                                    
                                </div>
                                <div className="post-area">
                                    <p onClick={() => navigate("/user/" + post.id)} className="user-name">{post.name}</p>
                                    {active && post.isFromUser ? 
                                            <TextArea active={active} 
                                                      readOnly={enableTextArea}
                                                      type="text" 
                                                      ref={textareaRef}
                                                      onKeyPress={handleUserKeyPress}
                                                      style={{color: '#4C4C4C'}}
                                                      defaultValue={post.text}>                                 
                                            </TextArea> 
                                            : 
                                            <p className="text"><Hashtag>{post.text}</Hashtag></p>}
                                    <a className="link-area" href={post.url} target="_blank" rel="noopener noreferrer">
                                        <div className="link-left">
                                            <div className="title">{post.title}</div>
                                            <div className="description">{post.description}</div>
                                            <div className="url">{post.url}</div>
                                        </div>
                                        <img src={post.image} alt="Post" />
                                    </a>
                                </div>
                            </Post>
                        );
                    })

                }
            </Main>
            <TrendingHashtags />
        </TimeLinePage>
    );
}

export default Timeline;


const TimeLinePage = styled.div`

    @media (min-width: 652px) {

        --width: 611px;
        --border-radius: 16px;

    }

    @media (min-width: 612px) and (max-width: 651px) {

        .timeline {
            padding-left: calc(325.5px - (100vw/2));
        }

        --width: 611px;
        --border-radius: 16px;
    }

    @media (max-width: 611px) {

        .timeline {
            padding-left: 20px;
        }

        --width: 100vw;
        --border-radius: 0px;

    }

    min-height: calc(100vh - 72px);
    background-color: #333333;
    margin-top: 72px;
    color: white;
    padding-bottom: 50px;

    display: flex;
    justify-content: center;
`;

const Main = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    

    .timeline {
        width: var(--width);
        margin-top: 78px;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        font-weight: 700;
        color: white;
    }

    .publish {
        height: 209px;
        width: var(--width);
        border-radius: var(--border-radius);
        margin-top: 43px;
        background-color: white;
        box-shadow: 0px 4px 4px 0px #00000040;

        display: flex;
    }

    .profile-picture {
        height: 100px;
        width: 68px;

        @media (max-width: 700px) {
            width: 0;
            height: 0;
        }
    }

    .profile-picture > img {
        margin: 9px 0 0 18px;
        height: 50px;
        width: 50px;
        border-radius: 25px;
        object-fit: cover;
    }

    .publish-form {
        height: 100%;
        width: calc(var(--width) - 68px);
        padding: 20px;

        display: flex;
        flex-direction: column;

        @media (max-width: 700px) {
            width: 100vw;
        }
    }

    .publish-form * {
        font-family: 'Lato', sans-serif;
    }

    .publish-form > p {
        color: black;
        font-size: 20px;
        font-weight: 300;
    }

    .publish-form > .url {
        width: calc(var(--width) - 108px);
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        padding: 0 13px;
        height: 30px;
        margin-top: 15px;
        font-weight: 300;
        font-size: 15px;

        @media (max-width: 700px) {
            width: 100%;
        }
    }

    .publish-form > .text {
        width: calc(var(--width) - 108px);
        background-color: #EFEFEF;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        padding: 8px 13px;
        height: 66px;
        margin-top: 5px;
        font-weight: 300;
        font-size: 15px;

        @media (max-width: 700px) {
            width: 100%;
        }
    }

    .publish-form > button {
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;
        margin-left: calc(100% - 112px);
        margin-top: 5px;
        border: none;
        font-size: 14px;
        font-weight: 700;
        color: white;
    }

    .message {
        margin-top: 20px;
    }
`;

const ProfileImage = styled.img`
     @media (max-width: 700px) {
        display: none;
    }
`

const Post = styled.div`
    min-height: 209px;
    width: var(--width);
    margin-top: 43px;
    border-radius: var(--border-radius);
    background-color: #171717;
    box-shadow: 0px 4px 4px 0px #00000040;
    position: relative;

    display: flex;

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-picture {
        height: 80px;
        width: 68px;
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
        padding: 20px;

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

const Icons = styled.div`
    width: 50px;
    height: 16px;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    top: 22px;
    right: 23px;
`;

const TextArea = styled.textarea`
    width: calc(var(--width) - 108px);
    height: 44px;
    border: none;
    border-radius: 7px;
    margin-top: 11px;
    background-color: ${(props) => (props.active ? '#FFFFFF' : '#171717')}
`;
