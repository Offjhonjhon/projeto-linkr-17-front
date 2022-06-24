import React, { useRef, useEffect, useState, useContext } from "react";
import StateContext from "../contexts/StateContext.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import useInterval from 'use-interval';
import TrendingHashtags from '../components/TrendingHashtags';
import PostComponent from "../components/PostComponent.js";
import Repost from "../components/Repost.js";

function Timeline() {
    const { URL } = useContext(StateContext)
    const data = localStorage.getItem("data");
    const token = JSON.parse(data).token;
    const getData = localStorage.getItem("data");
    const { avatar } = getData ? JSON.parse(getData) : '';
    const { setVisible } = useContext(StateContext);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [reposts, setReposts] = useState();
    const [lastUpdateTime, setLastUpdateTime] = useState("0");
    const [refresh, setRefresh] = useState([]);
    const [currentPage, setCurrentPage] = useState(-1);
    const loaderRef = useRef(null);
    const [loadingScroll, setLoadingScroll] = useState("");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

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


    function refreshTimeline() {
        setPosts([]);
        setNewPosts(0);
        setLastUpdateTime("0");
        setCurrentPage(0);
        setRefresh([]);
    }


    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver((entities) => {
            const target = entities[0];

            if (target.isIntersecting) {
                setCurrentPage(old => old + 1);
            }
        }, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }
    }, []);


    useEffect(() => {
        function getTimeline() {
            const promise = axios.get(URL + "/posts/page/" + currentPage + "/" + lastUpdateTime, { headers: { Authorization: `Bearer ${token}` } });

            posts.length === 0 ? setLoadingScroll("Loading...") : setLoadingScroll("Loading more posts...");

            promise.then(answer => {
                setPosts(old => {
                    setLoadingScroll("");

                    if (answer.data === "Empty") {
                        setLoadingScroll("No posts found from your friends");
                        return [...old];
                    } else if (answer.data === "No-followers") {
                        setLoadingScroll("You don't follow anyone yet. Search for new friends!");
                        return [...old];
                    } else {
                        if (currentPage === 0) { setLastUpdateTime(answer.data[0].createdAt) }
                        return [...old, ...answer.data];
                    }
                });
            });

            promise.catch(error => {
                alert("An error occured while trying to fetch the posts, please refresh the page");
            });
        }

        async function getPost() {
            const {data} = await axios.get(`${URL}/reposts`, config);
            setReposts(data);
        }

        if (token) {
            if (currentPage >= 0) { 
                getTimeline();
                getPost();
            }
        } else {
            navigate("/sign-in");
        }

    }, [URL, refresh, currentPage]);

    const [newPosts, setNewPosts] = useState(0);

    useInterval(() => {

        const promise = axios.get(URL + "/newposts/" + lastUpdateTime, { headers: { Authorization: `Bearer ${token}` } });

        promise.then(answer => {
            setNewPosts(answer.data);
        });

        promise.catch(error => {
            console.log("An error occured while trying to fetch the posts, please refresh the page");
        });
    }, 5000);


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

        const promisse = axios.post(`${URL}/publish`, publication, { headers: { Authorization: `Bearer ${token}` } });

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
            axios.post(`${URL}/hashtag/tag`, {
                publicationCode: publicationCode,
                tag: tag
            });
        })
    }

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
                {!newPosts ? "" :
                    <div className="timeline-updates" onClick={refreshTimeline}>
                        <p>{newPosts + " new posts, load more!"}</p>
                        <ion-icon name="reload-outline"></ion-icon>
                    </div>
                }
                {
                    posts.map((post, index) => {
                        return (
                            <PostComponent key={index} post={post} />
                        );
                    })
                }
                <Repost />
                <div className="message">
                    {loadingScroll === "Loading..." || loadingScroll === "Loading more posts..." ?
                        <TailSpin {...{ color: "#6D6D6D", width: "36px", height: "36px" }} /> :
                        <div className="loading-scroll"></div>
                    }
                    <p ref={loaderRef}>{loadingScroll}</p>
                </div>
            </Main >
            <TrendingHashtags />
        </TimeLinePage >
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
