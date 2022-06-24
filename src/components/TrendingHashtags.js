import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import StateContext from "../contexts/StateContext";

export default function TrendingHashtags() {
    const { URL } = useContext(StateContext);
    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        async function getTrendingHashtags() {
            try {
                const { data } = await axios.get(`${URL}/hashtag/trending-hashtags`);

                setHashtags(data.map(hashtag => hashtag.tag));

            } catch (error) {
                console.log(error)
            }
        }
        getTrendingHashtags();
    }, [URL]);


    return (
        <TrendingContainer>
            <TrendingTitle>trending</TrendingTitle>
            <TrendingLine />
            <TrendingHashtagsContainer>
                {hashtags.map((hashtag, index) => {
                    return (
                        <TrendingHashtag
                            key={index}
                            to={`/hashtag/${hashtag}`}
                        >
                            {`# ${hashtag}`}
                        </TrendingHashtag>
                    )
                }
                )}
            </TrendingHashtagsContainer>
        </TrendingContainer>
    );
}

const TrendingContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
    margin: 164px 0 0 25px;
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    color: #ffffff;
    
    

    @media (max-width: 750px) {
        display: none;
    }

`
const TrendingTitle = styled.h1`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    margin-left: 16px;
    margin-top: 9px;
`
const TrendingHashtagsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 22px;
    font-family: 'Lato';
    font-size: 19px;
    margin-left: 16px;
    height: 293px;

    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`

const TrendingHashtag = styled(Link)`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 0.05em;
    margin-top: 1px;
`

const TrendingLine = styled.hr`
    width: 100%;
    height: 1px;
    border-color: #484848;
`
