import { FaRetweet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import PostComponent from "./PostComponent";
import StateContext from "../contexts/StateContext";

export default function Repost() {
    const navigate = useNavigate();
    const {URL} = useContext(StateContext);
    const getData = localStorage.getItem("dados");
    const {token} = getData ? JSON.parse(getData) : '';
    const [posts, setPosts] = useState();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    useEffect(() => {
        async function getPost() {
            const {data} = await axios.get(`${URL}/reposts`, config);
            setPosts(data);
        }
        getPost();
    }, []);

    return posts ? (
        <Container>
            {posts.map(post => {
                return (
                    <Page>
                        <Info>
                            <p><FaRetweet /></p>
                            <h1>Re-posted by {post.userRepost}</h1>
                        </Info>
                        <PostComponent post={post}/>
                    </Page>
                );
            })}
        </Container>
    ) : <></>;
}

const Container = styled.div`
    margin-top: 120px;
`;

const Page = styled.div`
    @media (min-width: 652px) {
        --width: 611px;
        --border-radius: 16px;
    }

    @media (min-width: 612px) and (max-width: 651px) {
        --width: 611px;
        --border-radius: 16px;
    }

    @media (max-width: 611px) {
        --width: 100vw;
        --border-radius: 0px;
    }

    min-height: 150px;
    background-color: #333333;
    color: white;
    padding-bottom: 50px;
    display: flex;
    justify-content: center;
`;

const Info = styled.div`
    width: var(--width);
    height: 50px;
    padding-left: 10px;
    border-radius: var(--border-radius);
    background-color: #1E1E1E;
    box-shadow: 0px 4px 4px 0px #00000040;
    font-family: 'Lato';
    font-size: 12px;
    line-height: 13px;
    color: #FFFFFF;
    position: absolute;
    display: flex;

    p {
        font-size: 15px;
    }

    h1 {
        margin-left: 5px;
    }
`;