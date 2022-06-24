import Hashtag from '../components/Hashtag';
import TrendingHashtags from '../components/TrendingHashtags';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import StateContext from '../contexts/StateContext';
import PostComponent from '../components/PostComponent';

function HashtagPosts() {
    const { URL } = useContext(StateContext)
    const title = useParams().hashtag;
    const [posts, setPosts] = useState("Loading");

    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await axios.get(`${URL}/hashtag/${title}`);
                setPosts(data);
                console.log(data);
            }
            catch {
                alert("An error occured while trying to fetch the posts, please refresh the page");
            }
        }
        getPosts();


    }, [URL, title]);


    console.log(posts)
    return (
        <TimeLinePage>
            <Main>
                <div className="timeline"># {title}</div>
                {
                    posts === "Loading" ? <p className="message">Loading...</p> : posts === "Empty" ? <p className="message">There are no posts yet</p> : posts.map((post, index) => {
                        return (
                            <PostComponent key={index} post={post} />
                        );
                    })
                }
            </Main>
            <TrendingHashtags />
        </TimeLinePage>
    );
}

export default HashtagPosts;


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

