import PageContainer from '../components/PageContainer';
import TrendingHashtags from '../components/TrendingHashtags';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


function HashtagPosts() {
    const URL = `http://localhost:4000/`
    const title = useParams().hashtag;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                const { data } = await axios.get(`${URL}hashtag/${title}`);
                setPosts(data);
                console.log(data)
            }
            catch {
                console.log("error")
            }
        }
        getPosts();

    }, [title]);


    return (
        <PageContainer>
            <TrendingHashtags />
            <TrendingTittle>{`# ${title}`}</TrendingTittle>
        </PageContainer>
    );
}

export default HashtagPosts;

const TrendingTittle = styled.h1`
    position: absolute;
    left: 400px;
    top: 125px;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #FFFFFF;
    font-family: 'Oswald';

`